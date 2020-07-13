import * as Sentry from "@sentry/browser"
import environment from "../config/environment"

export default () => {
  console.log(environment)
  if (environment === undefined) return

  const dsn = process.env.REACT_APP_SENTRY_DSN

  // TODO Pass Git commit hash as third argument
  Sentry.init({
    dsn,
    environment
  })
}
