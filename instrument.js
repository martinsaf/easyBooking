import * as Sentry from "@sentry/node";
import "dotenv/config"; // Ensure that environment variables are loaded

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions
});
