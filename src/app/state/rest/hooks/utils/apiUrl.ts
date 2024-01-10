<<<<<<< HEAD
import slashSandwich from "../../../../routing/utils/slashSandwich"
=======
import slashSandwich from "slash-sandwich"
import { env } from "app/config/env"
>>>>>>> 42bfc866 (Change build to work for multiple environments)

/**
 * Utility function to create an API URL
 */
<<<<<<< HEAD
export const makeApiUrl = (...paths: Array<number|string|undefined>) => slashSandwich([process.env.REACT_APP_API_HOST, process.env.REACT_APP_API_PATH, ...paths])
=======
export const makeApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.REACT_APP_API_HOST, env.REACT_APP_API_PATH, ...paths])
>>>>>>> 4f30997b (Change build to work for multiple environments)

/**
 * Utility function to strip API host from URL
 */
export const stripApiHostFromUrl = (url: string) =>
  url.replace(new RegExp(`^${ env.REACT_APP_API_HOST }${ env.REACT_APP_API_PATH }`), "")

/**
 * Utility function to create an API URL for TON
 */
<<<<<<< HEAD
export const makeTonApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([process.env.REACT_APP_API_HOST_TON, process.env.REACT_APP_API_PATH_TON, ...paths], { trailingSlash: false })
=======
 export const makeTonApiUrl = (...paths: Array<number|string|undefined>) =>
  slashSandwich([env.REACT_APP_API_HOST_TON, env.REACT_APP_API_PATH_TON, ...paths], { trailingSlash: false })
>>>>>>> 42bfc866 (Change build to work for multiple environments)
