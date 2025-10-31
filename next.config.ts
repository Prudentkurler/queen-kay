import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Existing config options
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

// Sentry webpack plugin options
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin
  org: "queenkay",
  project: "queen-kay-ecommerce",
  
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  
  // Upload source maps to Sentry
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Sentry-specific options
  hideSourceMaps: true,
  widenClientFileUpload: true,
};

// Export config wrapped with Sentry
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
