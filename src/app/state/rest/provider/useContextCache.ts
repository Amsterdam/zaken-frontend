import { useCallback, useContext } from "react"
import { ApiContext } from "./ApiProvider"

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
    const { getContextItem, updateContextItem } = useContextCache("cases", makeApiUrl("tasks"))
*/

const useContextCache = (groupName: GroupName, apiUrl: string) => {
  const contextGroup = useContext(ApiContext)[groupName]
  const item = contextGroup.getCacheItem(apiUrl)?.value

  const getContextItem = useCallback(() => item, [item])
  const updateContextItem = useCallback((updatedItem: any) =>
    contextGroup.updateCacheItem(apiUrl, () => updatedItem), [contextGroup, apiUrl]
  )
  const clearContextCache = useCallback(() => contextGroup.clearCache(), [ contextGroup ])

  return { getContextItem, updateContextItem, clearContextCache }
}

export default useContextCache
