import { Language, Translation } from './types';
import { LANGUAGE } from './index';

import en from './translations/en';
import ru from './translations/ru';
import sp from './translations/sp';


type TranslationByLanguage = { [language in Language]: Translation};
const TRANSLATION_BY_LANGUAGE: TranslationByLanguage = {
  [LANGUAGE.ENGLISH]: en,
  [LANGUAGE.RUSSIAN]: ru,
  [LANGUAGE.SPANISH]: sp,
};

export default TRANSLATION_BY_LANGUAGE;