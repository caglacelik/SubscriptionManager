import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';


const resources = {
    en: {
        translation: translationEN
    },
    tr: {
        translation: translationTR
    }
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: document.querySelector('html').lang, // if you're using a language detector, do not define the lng option
        fallbackLng: "en"
    });
export default i18n;
