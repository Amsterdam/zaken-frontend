import * as Sentry from "@sentry/browser"

export default (message: string) => {
  Sentry.captureException(new Error(message))
}
