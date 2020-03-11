import objectValues from 'utils/objectValues';
import asEnum from 'utils/asEnum';

export const LANGUAGE = asEnum({
  ENGLISH: 'English',
  RUSSIAN: 'Русский',
  SPANISH: 'Español',
});

export const LANGUAGES = objectValues(LANGUAGE);


