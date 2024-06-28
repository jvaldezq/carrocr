/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['listings-prod.tcimg.net', 'www.edmunds.com', 'static.cargurus.com'],
        remotePatterns: [{
            protocol: 'https', hostname: 'www.edmunds.com', port: '', pathname: '/**',
        }],
    }
};

export default nextConfig;
