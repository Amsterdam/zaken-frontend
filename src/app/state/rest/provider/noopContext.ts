import { ApiCache } from "../hooks/useApiCache"
import { RequestQueue } from "../hooks/useRequestQueue"

const noop = () => {}

export const noopContext: ApiCache & RequestQueue = {
  isRequestPendingInQueue: () => false,
  pushRequestInQueue: noop,
  getCacheItem: () => ({ valid: false, value: undefined }),
  setCacheItem: noop,
  updateCacheItem: noop,
  clearCache: noop
}
