import * as CONTROL_LABEL from '../controlLabels';
import * as SIMULATED_DAY_PROPERTY from '../simulatedDayProperties';
import * as TITLE from '../titles';

export default {
  [TITLE.ROOT_VIEW]: {
    name: 'This is not the flu, ya dingus.',
  },
  [CONTROL_LABEL.CHANCE_OF_SPREADING]: {
    name: 'Chance of Spreading (1 in)',
  },
  [CONTROL_LABEL.DAYS_TO_SIMULATE]: {
    name: 'Days to Simulate',
  },
  [CONTROL_LABEL.NUMBER_OF_DAILY_PERSONAL_INTERACTIONS]: {
    name: 'Number of Daily Personal Interactions',
  },
  [SIMULATED_DAY_PROPERTY.ACTIVE_CASES]: {
    name: 'Active Cases',
  },
  [SIMULATED_DAY_PROPERTY.GROWTH_FACTOR]: {
    name: 'Growth Factor',
  },
  [SIMULATED_DAY_PROPERTY.NEW_CASES]: {
    name: 'New Cases',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_CASES]: {
    name: 'Total Cases',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES]: {
    name: 'Total Fatalities',
  }
};
