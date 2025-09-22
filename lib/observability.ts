import * as Sentry from "@sentry/node";

export function initObservability() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
}

export function captureException(e: any) {
  if (process.env.SENTRY_DSN) Sentry.captureException(e);
  else console.error(e);
}
