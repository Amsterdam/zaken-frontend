import * as Sentry from "@sentry/browser"

export default () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN
  const environment = process.env.REACT_APP_SENTRY_ENVIRONMENT

  if (dsn === undefined || environment === undefined) return

  // TODO Pass Git commit hash as third argument
  Sentry.init({
    dsn,
    environment
  })
}
