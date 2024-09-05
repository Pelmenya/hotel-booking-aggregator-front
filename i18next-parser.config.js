// Для создания автоматических ключей во всех языках
// t('value', 'Значение') - использование
module.exports = {
    contextSeparator: '_',
    createOldCatalogs: false,
    defaultNamespace: 'translation',
    defaultValue: '',
    keySeparator: '.',
    lexers: {
        js: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
        ts: ['JavascriptLexer'],
        tsx: ['JsxLexer'],
        default: ['JavascriptLexer']
    },
    lineEnding: 'auto',
    locales: ['en', 'ru'],
    namespaceSeparator: ':',
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    pluralSeparator: '_',
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    sort: true,
    useKeysAsDefaultValue: true,
    verbose: false,
    keepRemoved: true // опция, предотвращающая удаление существующих ключей !!!
};


