import { GROWTH_FACTOR, ACTIVE_CASES, TOTAL_CASES, TOTAL_FATALITIES, NEW_CASES } from 'constants/simulatedDayProperties';
import millify from './configuredMillify';

export default {
  [GROWTH_FACTOR]: (number: number): string => String(number),
  [ACTIVE_CASES]: (number: number): string => millify(number),
  [TOTAL_CASES]: (number: number): string => millify(number),
  [TOTAL_FATALITIES]: (number: number): string => millify(number),
  [NEW_CASES]: (number: number): string => millify(number),
};
