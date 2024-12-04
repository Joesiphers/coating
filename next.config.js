/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", //for docker
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'neonpg.onrender.com',
            port: '',
            pathname: '/uploads/images/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '5002',
            pathname: '/uploads/images/**',
          },
        ],
      },
}

module.exports = nextConfig
