import * as Sentry from "@sentry/node";
import "dotenv/config"; // Certifique-se de que as variáveis de ambiente são carregadas

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Monitoramento de desempenho
  tracesSampleRate: 1.0, // Capture 100% das transações
});
