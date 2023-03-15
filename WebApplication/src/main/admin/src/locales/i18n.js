import { initReactI18next } from "react-i18next";
import en from "./en.json";
import vi from "./vi.json";
import i18n from "i18next";
const resources = {
    en: { translation: en },
    vi: { translation: vi },
};
i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
})
export default i18n;

