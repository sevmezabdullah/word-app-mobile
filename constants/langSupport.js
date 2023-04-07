import { I18n } from 'i18n-js';
import { en, tr, gb, ar } from '../constants/localizations.json';
import { getLocales } from 'expo-localization';

export const i18n = new I18n({ tr, en, ar, gb });
const locale = getLocales();
const lang = locale[0].languageCode;
i18n.locale = lang;
