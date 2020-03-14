/**
 * Beware what ye find in here, for it is death and disease.
 * Don't say ye weren't warned as the blackened skin falls from thine bones.
 */

// Types
import {
  Props, SimulatedDay
} from './types';

// Constants
import { TOTAL_POPULATION, TIME_TO_RESOLUTION, CFR } from './constants';


export default ({
  totalPopulation = TOTAL_POPULATION,
  fixedProbabilityOfSpread = 1/220,
  fixedInterpersonalInteractions = 12,
  daysToSimulate = 365,
  cfr = CFR,
  startingNumberOfCases = 10,
}: Partial<Props> = {} as Props): SimulatedDay[]  => {
  // Bootstrap the first day.
  const simulated: SimulatedDay[] = [{
    day: 0,
    healthyPopulation: totalPopulation,
    totalCases: startingNumberOfCases,
    totalIncreaseFactor: 0,
    growthFactor: 0,
    activeCases: startingNumberOfCases,
    newCases: startingNumberOfCases,
    newFatalities: 0,
    newRecoveries: 0,
    totalFatalities: 0,
    totalRecoveries: 0,
  }];

  for (let i = 1; i < daysToSimulate; i++) {
    const previous = simulated[i - 1];
    const current = {} as SimulatedDay;

    /* Add reference to day for maintaining reference when viewing slices of all days. */
    current.day = i;

    /* Calculate susceptible personal interactions. we limit the fixed personal interactions
       down to the percentage of the population that is still actually susceptible to the spread.
       This is the primary factor in turning this from an exponential equation into a logistic one.
       TODO get input from experts in infectious disease to help make this take into account real
       factors that would determine how people interact with each other.
     */
    const susceptiblePersonalInteractions = fixedInterpersonalInteractions * (previous.healthyPopulation / totalPopulation);
    
    /** Calculate probability of spread. TODO: get input from experts in infectious disease to help make this less arbitrary. */
    const probabilityOfSpread = fixedProbabilityOfSpread;

    /**
     * Calculate new cases.
     * TODO potentially rather than taking all active cases, adjust this to be only cases that were created within the last
     * N number of days, as we can probably assume that once they are in the hospital they are no longer responsible for
     * speading as much? I'm sure that's only true to a degree, might be tricky to model correctly.
     * */
    current.newCases = Math.round(previous.activeCases * probabilityOfSpread * susceptiblePersonalInteractions);

    /** Increase total cases by new cases. */
    current.totalCases = previous.totalCases + current.newCases;

    /** Account for overshooting total population in the case of aggressive exponentiation. */
    const overshot = totalPopulation - current.totalCases;
    if (overshot < 0) {
      current.newCases += overshot;
      current.totalCases += overshot;
    }

    /** Calculate factors of growth. */
    current.totalIncreaseFactor = current.totalCases / previous.totalCases;
    current.growthFactor = current.newCases / previous.newCases;

    /** Update healthy remaining population. Could also obviously alternatively be done by previous.healthyCases - current.newCases */
    current.healthyPopulation = totalPopulation - current.totalCases;

    /**
     * Handle resolution of deaths/recoveries from previous cases.
     * This is currently simplified to say that every case is resolved in some fixed amount of time
     * and is certain to end in either full recover or death.
     * TODO speak with experts in infectious disease to model more complex outcomes.
     * */
    const dayToResolve = i - TIME_TO_RESOLUTION;
    current.newFatalities = (dayToResolve > 0) ? Math.round(simulated[dayToResolve].newCases * cfr) : 0;
    current.newRecoveries = (dayToResolve > 0) ? (simulated[dayToResolve].newCases - current.newFatalities) : 0;
    current.totalFatalities = previous.totalFatalities + current.newFatalities;
    current.totalRecoveries = previous.totalRecoveries + current.newRecoveries;

    /** Calculate the current active cases. This takes all new cases and removes all newly resolved cases. */
    current.activeCases = previous.activeCases + current.newCases - (current.newFatalities + current.newRecoveries);

    simulated.push(current);
  }
  return simulated;
};
