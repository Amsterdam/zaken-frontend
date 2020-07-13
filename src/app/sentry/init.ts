import * as Sentry from "@sentry/browser"

type Environment = "production" | "acceptance"

const getEnvironment = (): Environment | undefined => {
  const { hostname } = window.location
  const environment =
    hostname === "zaken.amsterdam.nl" ? "production" :
    hostname === "acc.zaken.amsterdam.nl" ? "acceptance" :
    undefined
  return environment
}

export default () => {
  // TODO Get environment from .env file
  const environment = getEnvironment()
  if (environment === undefined) return

  const dsn = process.env.REACT_APP_SENTRY_DSN

  // TODO Pass Git commit hash as third argument
  Sentry.init({
    dsn,
    environment
  })
}
