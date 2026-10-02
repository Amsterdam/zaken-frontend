import { useContext } from "react"
import { ApiContext } from "app/state/rest/provider/ApiProvider"
import type { ApiGroup } from "app/state/rest"

/**
 * Marks only the old-cache items of a group whose url starts with urlPrefix as
 * invalid, so they refetch the next time a component uses them (not right now).
 * For targeted invalidation from a migrated mutation; remove with the old layer.
 */
export const useInvalidateLegacyCacheItems = (groupName: ApiGroup) => {
  const { invalidateCacheItems } = useContext(ApiContext)[groupName]
  return invalidateCacheItems
}

/**
 * Updates one cached item of the old layer in place (an immer updater), without
 * a request. Does nothing when the url isn't cached (yet). For migrated
 * mutations that know the new data; remove with the old layer.
 */
export const useUpdateLegacyCacheItem = (groupName: ApiGroup) => {
  const { getCacheItem, updateCacheItem } = useContext(ApiContext)[groupName]

  return <Item>(url: string, updater: (item: Item) => void) => {
    if (getCacheItem(url)?.value === undefined) return
    updateCacheItem(url, updater)
  }
}
