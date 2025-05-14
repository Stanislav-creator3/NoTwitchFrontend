import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '8aa1a4ea-d4da-42a4-82ad-ec39b9736c60.selstorage.ru',
      }
    ]
  }
};

export default withNextIntl(nextConfig);
