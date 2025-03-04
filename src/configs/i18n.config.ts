/**
 *
 * Get started with react-i18next: https://react.i18next.com/getting-started
 *
 **/

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { langs } from '@/langs';
// import Backend from 'i18next-httpConfig-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using httpConfig -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      ...langs,
    },
    lng: 'ja', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });

export default i18n;
