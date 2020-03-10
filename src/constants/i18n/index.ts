import { Language } from '../index';
import { Translation } from './types';

import en from './translations/en';

type TranslationByLanguage = { [language in Language]: Translation};
const TRANSLATION_BY_LANGUAGE: TranslationByLanguage = {
  [Language.English]: en,
  [Language.Russian]: en,
};

export default TRANSLATION_BY_LANGUAGE;
