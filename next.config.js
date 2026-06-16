/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/rooms',
        destination: 'https://www.swiftbook.io/inst/#/home?propertyId=761NJ6u4EiTKQwTELeKjmVfq0fgZIjG99D7zZ5hY9kTU0NTM=&JDRN=Y&RoomID=217890,217893,217887,217891,217888,217885,217883,217886,217884,217898,217895&ap=1&gsId=761NJ6u4EiTKQwTELeKjmVfq0fgZIjG99D7zZ5hY9kTU0NTM=',
        permanent: false,
      },
      {
        source: '/rooms/:slug*',
        destination: 'https://www.swiftbook.io/inst/#/home?propertyId=761NJ6u4EiTKQwTELeKjmVfq0fgZIjG99D7zZ5hY9kTU0NTM=&JDRN=Y&RoomID=217890,217893,217887,217891,217888,217885,217883,217886,217884,217898,217895&ap=1&gsId=761NJ6u4EiTKQwTELeKjmVfq0fgZIjG99D7zZ5hY9kTU0NTM=',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

