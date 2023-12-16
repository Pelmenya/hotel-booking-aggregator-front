/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
        appDir: true,
    },
    // добавляем загрузку svg
    webpack(config, options) {
        config.module.rules.push({
            loader: '@svgr/webpack',
            issuer: /\.[jt]sx?$/,
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    plugins: [{
                        name: 'preset-default',
                        params: {
                            override: {
                                removeViewBox: false
                            }
                        }
                    }],
                },
                titleProp: true,
            },
            test: /\.svg$/,
        });

        return config;
    },
    // отключаем кеширование
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
        {
            source: '/hotel-rooms/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
        {
            source: '/hotels/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },

    ],
}