import { init } from "@sentry/react"

export default () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN
  const environment = process.env.REACT_APP_ENVIRONMENT
  const name = process.env.REACT_APP_SENTRY_PROJECT_NAME ?? ""
  const release = process.env.REACT_APP_GIT_COMMIT_HASH ?? ""
  if (dsn === undefined || environment === undefined) return

  init({
    dsn,
    environment,
    release: `${ name }@${ release }`
  })
}