/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure we use port 3000 for the frontend
  // The server.js custom server setup is needed to override the port
  // as Next.js doesn't support port configuration directly in next.config.js
};

module.exports = nextConfig; 