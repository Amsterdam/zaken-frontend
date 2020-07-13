import * as Sentry from "@sentry/browser"

export default () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN
  const environment = process.env.REACT_APP_SENTRY_ENVIRONMENT
  const release = process.env.REACT_APP_GIT_COMMIT_HASH

  if (dsn === undefined || environment === undefined) return

  Sentry.init({
    dsn,
    environment,
    release
  })
}
