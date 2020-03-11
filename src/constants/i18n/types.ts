import { LANGUAGE } from './index';

import en from './translations/en';

export type Language = typeof LANGUAGE[keyof typeof LANGUAGE];

export type Translation = typeof en;
