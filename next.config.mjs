/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['listings-prod.tcimg.net', 'www.edmunds.com', 'static.cargurus.com', 'media.licdn.com', 'http://bmcloud9.com'],
        remotePatterns: [{
            protocol: 'https', hostname: 'www.edmunds.com', port: '', pathname: '/**',
        }, {
            protocol: 'http', hostname: 'bmcloud9.com', port: '', pathname: '/**',
        }],
    }
};

export default nextConfig;
