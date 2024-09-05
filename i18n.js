import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import nextI18NextConfig from './next-i18next.config';

const isServer = typeof window === 'undefined';
const loadPath = process.env.NEXT_PUBLIC_I18NEXT_LOAD_PATH || '/locales/{{lng}}/{{ns}}.json';
const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        ...nextI18NextConfig,
        ns: ['common'], // Указываем namespace
        defaultNS: 'common', // Устанавливаем default namespace
        backend: {
            loadPath: isServer ? loadPath : '/locales/{{lng}}/{{ns}}.json', // Используем переменные окружения
        },
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
        lng: 'ru',
        saveMissing: true,
        missingKeyHandler: function(lng, ns, key, fallbackValue) {
            console.warn(`Missing translation for key: ${key}`);
        }
    }, (err, t) => {
        if (err) console.error('i18next initialization failed', err);
        else console.log('i18next initialized successfully');
    });

if (isDev) {
    i18n.on('initialized', (options) => {
        console.log('i18next initialized with options', options);
    });

    i18n.on('loaded', (loaded) => {
        console.log('Loaded resources:', loaded);
    });

    i18n.on('failedLoading', (lng, ns, msg) => {
        console.error(`Loading failed for ${lng}/${ns}: ${msg}`);
    });

    i18n.on('languageChanged', (lng) => {
        console.log('Language changed to', lng);
    });
}

export default i18n;
