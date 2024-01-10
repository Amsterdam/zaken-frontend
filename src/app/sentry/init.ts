import { init } from "@sentry/react"
import { env } from "app/config/env"

export default () => {
  const dsn = env.REACT_APP_SENTRY_DSN
  const environment = env.REACT_APP_ENVIRONMENT
  const name = env.REACT_APP_SENTRY_PROJECT_NAME ?? ""
  const release = env.REACT_APP_GIT_COMMIT_HASH ?? ""
  if (dsn === undefined || environment === undefined) return

  init({
    dsn,
    environment,
    release: `${ name }@${ release }`,
    autoSessionTracking: false
  })
}