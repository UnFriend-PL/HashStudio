/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    distDir: 'build',
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    webpack(config) {
        // Skip Webpack config when Turbopack is active
        if (process.env.NEXT_DEV_TURBOPACK) return config;

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
