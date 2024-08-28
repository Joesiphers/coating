/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", //for docker
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '34.82.14.85',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
