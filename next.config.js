/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // cache fonts for 1 year.
  async headers() {
    return [
      {
        source: '/fonts/coding/:font',
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
