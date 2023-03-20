/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        minHeight: {
            'main': 'calc(100vh - 64px)'
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                mono: ['var(--font-roboto-mono)'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            'light',
            'dark',
        ],
    },
}
