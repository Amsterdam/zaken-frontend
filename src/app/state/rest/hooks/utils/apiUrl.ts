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
export const stripApiHostFromUrl = (url: string) =>
  url.replace(new RegExp(`^${ env.REACT_APP_API_HOST }${ env.REACT_APP_API_PATH }`), "")

/**
 * Utility function to create an API URL for TON
 */
export const makeTonApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.REACT_APP_API_HOST_TON, env.REACT_APP_API_PATH_TON, ...paths], { trailingSlash: false })