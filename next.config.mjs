/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Security headers for all pages
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Additional security for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ]
  },
  // Redirect potentially dangerous paths
  async redirects() {
    return [
      // Block common attack vectors
      {
        source: "/.env",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/.git/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/phpmyadmin/:path*",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/admin.php",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/404",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
