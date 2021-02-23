import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCase = (id?: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Case>({
    lazy: id === undefined,
    ...options,
    url: makeApiUrl("cases", id),
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
    url: makeApiUrl("cases"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseEvents = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseEvent[]>({
    ...options,
    url: makeApiUrl("cases", caseId, "events"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useDebriefings = (id?: number, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Debriefing>({
    ...options,
    url: makeApiUrl("debriefings", id),
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
    url: makeApiUrl("summons"),
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
    url: makeApiUrl("cases", caseId, "tasks"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTaskComplete = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaTaskComplete>({
    ...options,
    url: makeApiUrl("camunda", "task", "complete"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseVisits = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeApiUrl("cases", caseId, "visits"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useVisitsCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Visit>({
    ...options,
    url: makeApiUrl("visits"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useDueDate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.DueDate>({
    ...options,
    url: makeApiUrl("camunda/task/date"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
