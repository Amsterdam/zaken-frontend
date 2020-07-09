import * as Sentry from "@sentry/browser"

export default () => {
  const environment = process.env.REACT_APP_SENTRY_ENV
  const dsn = process.env.REACT_APP_SENTRY_DSN

  if (environment === undefined) return

  // @TODO: Pass Git commit hash as third argument
  Sentry.init({
    dsn,
    environment
  })
}
