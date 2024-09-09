import slashSandwich from "../../../../routing/utils/slashSandwich"
import { env } from "app/config/env"

/**
 * Utility function to create an API URL
 */
export const makeApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.REACT_APP_API_HOST, env.REACT_APP_API_PATH, ...paths])

/**
 * Utility function to strip API host from URL
 */
export const stripApiHostFromUrl = (url: string) => {
  const apiHost = env.REACT_APP_API_HOST
  const apiPath = env.REACT_APP_API_PATH

  // Ensure the host and path are escaped properly for regular expression usage
  const escapedApiHost = apiHost.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const escapedApiPath = apiPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  const fullPattern = `^${ escapedApiHost }${ escapedApiPath }`
  const regex = new RegExp(fullPattern)

  return url.replace(regex, "")
}

/**
 * Utility function to create an API URL for TON
 */
export const makeTonApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.REACT_APP_API_HOST_TON, env.REACT_APP_API_PATH_TON, ...paths], { trailingSlash: false })