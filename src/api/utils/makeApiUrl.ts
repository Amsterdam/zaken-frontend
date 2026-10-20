import slashSandwich from "@/api/utils/slashSandwich"
import { env } from "@/config/env"

/** An url of our own API, always with a trailing slash. */
export const makeApiUrl = (...paths: Array<number | string | undefined>) =>
  slashSandwich([env.VITE_API_URL, ...paths])

/** An url of the TON API, without a trailing slash. */
export const makeTonApiUrl = (...paths: Array<number | string | undefined>) =>
  slashSandwich([env.VITE_TON_API_URL, ...paths], { trailingSlash: false })
