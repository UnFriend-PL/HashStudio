/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
        i18n: {
            locales: ['en-US', 'pl-PL', 'pl'],
            defaultLocale: 'en-US',
        },
    },
    webpack(config) {
        if (process.env.NEXT_DEV_TURBOPACK) return config;

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default withNextIntl(nextConfig);
