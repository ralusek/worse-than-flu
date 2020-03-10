import { Language } from '../index';
import { Translation } from './types';

import en from './translations/en';
import ru from './translations/ru';

type TranslationByLanguage = { [language in Language]: Translation};
const TRANSLATION_BY_LANGUAGE: TranslationByLanguage = {
  [Language.English]: en,
  [Language.Russian]: ru,
};

export default TRANSLATION_BY_LANGUAGE;
