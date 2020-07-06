import qs from "qs"
import { setupCache } from "axios-cache-adapter"
import { AxiosRequestConfig } from "axios"

/**
 * Prefixes cache-key with group-identifier
 */
const generateKeyFromRequest = (request: AxiosRequestConfig) => {
    const group = request.cache?.key
      ? request.cache?.key(request)
      : "unknown"
    return `__${ group }__${ request.url }${ qs.stringify(request.params, { addQueryPrefix: true } ) }`
}

/**
 * Implements a simple store to pass into `axios-cache-adapter`
 */
class CacheStore {
  constructor (private store: Record<string, any> = {}) {}

  getItem (key: string) {
    return this.store[key]
  }

  setItem (key: string, value: any) {
    this.store[key] = value
    return value
  }

  /**
   * NOTE: Removes all items with the same prefix
   */
  removeItem (key: string) {
    const matches = key.match(/^__(\w+)__/)
    if (matches && matches.length > 0) {
      const prefix = matches[0]

      Object
        .keys(this.store)
        .filter(key => key.startsWith(prefix))
        .forEach(key => {
          delete this.store[key]
        })
    }
  }
}

const store = new CacheStore()

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  window.cacheStore = store
}

/**
 * Setup caching
 */
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 minutes
  key: generateKeyFromRequest,
  store
})

export default cache
