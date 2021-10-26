import { useCallback, useContext } from "react"
import { ApiContext } from "../../../../state/rest/provider/ApiProvider"
import { makeApiUrl } from "../../../../state/rest/hooks/utils/apiUrl"

type GroupName = "cases" | "case" | "auth" | "users" | "themes" | "roles" | "permissions"

/*
 ** Hook for getting and updating items in the Context.
 ** GroupName and urlKey are defined in the hook where the useApiRequest hook is called.

    EXAMPLE:
    export const useTask = (id: number | string, options?: Options) => {
      return useApiRequest<Components.Schemas.CaseUserTaskList>({
        ...options,
        lazy: true,
        url: makeApiUrl("tasks"),
        groupName: "cases",
      })
    }

    CORRECT:
    const { getContextItem, updateContextItem } = useContextCache("cases", "tasks")
*/

const useContextCache = (groupName: GroupName, url: string) => {
  const contextGroup = useContext(ApiContext)[groupName]

  const key = makeApiUrl(url)
  const item = contextGroup.getCacheItem(key).value

  const getContextItem = useCallback(() => item, [item])
  const updateContextItem = useCallback((updatedItem: any) =>
    contextGroup.updateCacheItem(key, () => updatedItem), [contextGroup, key]
  )

  return { getContextItem, updateContextItem }
}

export default useContextCache
