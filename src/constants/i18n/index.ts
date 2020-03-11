import objectValues from 'utils/objectValues';
import asEnum from 'utils/asEnum';

export const LANGUAGE = asEnum({
  ENGLISH: 'English',
  RUSSIAN: 'Russian',
  SPANISH: 'Spanish',
});

export const LANGUAGES = objectValues(LANGUAGE);


