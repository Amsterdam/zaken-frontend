import { env } from "app/config/env"

/**
 * Whether this is the acceptance or a local environment (from
 * top-frontend-v2). Anything else, also an environment without a name, counts
 * as production.
 */
export const isAcceptanceOrLocalEnvironment = (): boolean =>
  env.VITE_ENVIRONMENT_SHORT === "ACC" || env.VITE_ENVIRONMENT_SHORT === "LOCAL"
