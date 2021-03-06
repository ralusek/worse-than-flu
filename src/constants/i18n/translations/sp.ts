import * as CONTROL_LABEL from '../../controlLabels';
import * as SIMULATED_DAY_PROPERTY from '../../simulatedDayProperties';
import * as TITLE from '../../titles';

export default {
  [TITLE.ROOT_VIEW]: {
    name: 'Esta no es la gripe, ganso tonto.',
  },
  [CONTROL_LABEL.CHANCE_OF_SPREADING]: {
    name: 'Posibilidad De Propagarse 1 en',
  },
  [CONTROL_LABEL.STARTING_NUMBER_OF_CASES]: {
    name: 'Número de Casos Inicial',
  },
  [CONTROL_LABEL.DAYS_TO_SIMULATE]: {
    name: 'Días Simuladas',
  },
  [CONTROL_LABEL.NUMBER_OF_DAILY_PERSONAL_INTERACTIONS]: {
    name: 'Número De Interacciones Personales Por Día',
  },
  [SIMULATED_DAY_PROPERTY.ACTIVE_CASES]: {
    name: 'Casos Activos',
  },
  [SIMULATED_DAY_PROPERTY.GROWTH_FACTOR]: {
    name: 'Factor De Crecimiento',
  },
  [SIMULATED_DAY_PROPERTY.NEW_CASES]: {
    name: 'Casos Nuevos',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_CASES]: {
    name: 'Casos Totales',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES]: {
    name: 'Total De Fatalidades',
  },
  [TITLE.PEOPLE]: {
    name: 'Personas',
  },
  [TITLE.DAYS]: {
    name: 'Días',
  },
};
