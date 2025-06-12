import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'super-space-happiness-rwq66qg4pv72wr-3000.app.github.dev/',
      ],
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net",
              "font-src 'self' https://use.typekit.net https://p.typekit.net",
              "connect-src 'self' https://use.typekit.net https://p.typekit.net https://www.google-analytics.com",
              "img-src 'self' data: https://use.typekit.net https://p.typekit.net",
              "frame-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
