import type { ContextType, ReactNode } from "react"
import { ApiContext } from "app/state/rest/provider/ApiProvider"
import { noopContext } from "app/state/rest/provider/noopContext"
import type { ApiGroup } from "app/state/rest"
import { createQueryWrapper } from "./createQueryWrapper"

type GroupContext = ContextType<typeof ApiContext>[ApiGroup]

const API_GROUPS: ApiGroup[] = [
  "addresses",
  "auth",
  "case",
  "cases",
  "dataPunt",
  "fines",
  "housingCorporations",
  "listings",
  "permissions",
  "permits",
  "roles",
  "supportContacts",
  "task",
  "themes",
  "users",
]

/**
 * Like createQueryWrapper, plus the old ApiContext (app/state/rest) with spies
 * for the groups you pass, to test the migration bridge between both caches.
 */
export const createLegacyApiWrapper = (
  groups: Partial<Record<ApiGroup, Partial<GroupContext>>> = {},
) => {
  const { Wrapper: QueryWrapper, queryClient } = createQueryWrapper()
  const legacyContext = Object.fromEntries(
    API_GROUPS.map((group) => [group, { ...noopContext, ...groups[group] }]),
  ) as ContextType<typeof ApiContext>

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryWrapper>
      <ApiContext.Provider value={legacyContext}>
        {children}
      </ApiContext.Provider>
    </QueryWrapper>
  )

  return { Wrapper, queryClient }
}
