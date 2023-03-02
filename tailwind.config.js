/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                mono: ['var(--font-roboto-mono)'],
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/forms')
    ],
    daisyui: {
        themes: [
            'light',
            'dark',
        ],
    },
}
