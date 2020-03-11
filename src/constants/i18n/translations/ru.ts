import * as CONTROL_LABEL from '../../controlLabels';
import * as SIMULATED_DAY_PROPERTY from '../../simulatedDayProperties';
import * as TITLE from '../../titles';

export default {
  [TITLE.ROOT_VIEW]: {
    name: 'Это не простуда, приятель.',
  },
  [CONTROL_LABEL.CHANCE_OF_SPREADING]: {
    name: 'Шанс Распространения 1 к',
  },
  [CONTROL_LABEL.DAYS_TO_SIMULATE]: {
    name: 'Дней Симуляции',
  },
  [CONTROL_LABEL.NUMBER_OF_DAILY_PERSONAL_INTERACTIONS]: {
    name: 'Количество Ежедневных Персональных Контактов',
  },
  [SIMULATED_DAY_PROPERTY.ACTIVE_CASES]: {
    name: 'Активные Случаи',
  },
  [SIMULATED_DAY_PROPERTY.GROWTH_FACTOR]: {
    name: 'Фактор Роста',
  },
  [SIMULATED_DAY_PROPERTY.NEW_CASES]: {
    name: 'Новые Случаи',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_CASES]: {
    name: 'Всего Случаев',
  },
  [SIMULATED_DAY_PROPERTY.TOTAL_FATALITIES]: {
    name: 'Всего Смертей',
  },
  [TITLE.PEOPLE]: {
    name: 'Люди',
  },
  [TITLE.DAYS]: {
    name: 'Дней',
  },
};
