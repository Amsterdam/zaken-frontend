import { ApiCache } from "../hooks/useApiCache"
import { RequestQueue } from "../hooks/useRequestQueue"

const noopUndefined = () => undefined
const noopBoolean = () => false

export const noopContext: ApiCache & RequestQueue = {
  isRequestPendingInQueue: noopBoolean,
  pushRequestInQueue: noopUndefined,
  getCacheItem: () => ({ valid: false, value: undefined }),
  setCacheItem: noopUndefined,
  updateCacheItem: noopUndefined,
  clearCache: noopUndefined
}
