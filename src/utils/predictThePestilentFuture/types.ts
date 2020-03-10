export type Props = {
  /** Total number of days to simulate. */
  daysToSimulate: number;
  /** The total population within which to simulate. */
  totalPopulation: number;
  /** The arbitrary fixed probability of spread. */
  fixedProbabilityOfSpread: number;
  /** The amount of anticipated interpersonal daily interactions within the population. */
  fixedInterpersonalInteractions: number;
  /** The Case Fatality Rate with which to simulate the disease. */
  cfr: number;
};

export type SimulatedDay = {
  /** Total number of cases up until this day. */
  totalCases: number;
  /** Total factor increase between previous day's total and this day's. */
  totalIncreaseFactor: number;
  /** Rate of change between new cases between this day and previous day. */
  growthFactor: number;
  /** Number of new cases emerged on this day. */
  newCases: number;
  /** Number of active cases on this day. */
  activeCases: number;
  /** Number of healthy remaining people in the population. */
  healthyPopulation: number;
  /** Deaths this day. */
  newFatalities: number;
  /** Total deaths. */
  totalFatalities: number;
  /** Recoveries this day. */
  newRecoveries: number;
  /** Total recoveries. */
  totalRecoveries: number;
};
