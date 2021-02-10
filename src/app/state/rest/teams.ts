
import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useTeams = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseTeamList>({
    ...options,
    url: makeGatewayUrl("teams"),
    groupName: "teams",
    handleError,
    isProtected: true
  })
}

export const useReasons = (teamId?: Components.Schemas.CaseTeam["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseReasonList>({
    lazy: teamId === undefined,
    ...options,
    url: makeGatewayUrl("teams", teamId, "reasons"),
    groupName: "teams",
    handleError,
    isProtected: true
  })
}

export const useSummonTypes = (teamId?: Components.Schemas.CaseTeam["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSummonTypeList>({
    ...options,
    lazy: teamId === undefined,
    url: makeGatewayUrl("teams", teamId, "summon-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}