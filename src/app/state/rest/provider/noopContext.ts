import { ApiCache } from "../hooks/useApiCache"
import { RequestQueue } from "../hooks/useRequestQueue"

const noop = () => {}
const noopBoolean = () => false

export const noopContext: ApiCache & RequestQueue = {
  isRequestPendingInQueue: noopBoolean,
  pushRequestInQueue: noop,
  getCacheItem: () => ({ valid: false, value: undefined }),
  setCacheItem: noop,
  updateCacheItem: noop,
  clearCache: noop
}
