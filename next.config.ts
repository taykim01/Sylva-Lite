import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
