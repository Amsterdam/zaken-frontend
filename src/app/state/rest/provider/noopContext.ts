import { ApiCache } from "../hooks/useApiCache"
import { RequestQueue } from "../hooks/useRequestQueue"

const noopUndefined = () => undefined
const noopBoolean = () => false

export const noopContext: ApiCache & RequestQueue = {
  isPendingRequest: noopBoolean,
  pushRequest: noopUndefined,
  getCacheItem: noopUndefined,
  setCacheItem: noopUndefined,
  clearCache: noopUndefined
}
