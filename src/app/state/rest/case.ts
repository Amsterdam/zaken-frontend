import type { Options } from "./"
import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useCase = (id?: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    lazy: id === undefined,
    ...options,
    url: makeGatewayUrl("cases", id),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseCreateUpdate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseCreateUpdate>({
    lazy: true,
    ...options,
    url: makeGatewayUrl("cases"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseEvents = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseEvent[]>({
    ...options,
    url: makeGatewayUrl("cases", caseId, "events"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useDebriefings = (id?: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Debriefing>({
    ...options,
    url: makeGatewayUrl("debriefings", id),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

// TODO-MOCKED replace with real endpoint
export const useOpinions = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Opinion[]>({
    ...options,
    url: "opinions",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

export const useSummons = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Summon>({
    ...options,
    url: makeGatewayUrl("summons"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

// TODO-MOCKED used to show the summon in OpinionForm
export const useSummon = (id?: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Summon>({
    ...options,
    url: `summons/${ id }`,
    lazy: id === undefined,
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

// TODO-MOCKED replace with real endpoint
export const useDecisions = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Decision[]>({
    ...options,
    url: "decisions",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

// TODO-MOCKED replace with real endpoint
export const useCorrespondence = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Correspondence[]>({
    ...options,
    url: "correspondence",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

// TODO-MOCKED replace with real endpoint
export const useCompleteCase = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.CompleteCase[]>({
    ...options,
    url: "completeCases",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

export const useCaseTasks = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaTask[]>({
    ...options,
    url: makeGatewayUrl("cases", caseId, "tasks"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskComplete = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaTaskComplete>({
    ...options,
    url: makeGatewayUrl("camunda", "task", "complete"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseVisits = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl("cases", caseId, "visits"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useVisitsCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeGatewayUrl("visits"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
