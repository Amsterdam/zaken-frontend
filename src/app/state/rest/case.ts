import type { Options } from "./"
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"
import qs from "qs"

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

export const useCaseCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseCreateUpdate, CaseCreate>({
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

export const useDebriefingCreate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.DebriefingCreate>({
    lazy: true,
    ...options,
    url: makeApiUrl("debriefings"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

// Post a summon
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

// Get summons for a specific case
export const useSummonsWithCaseId = (caseId?: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  const queryString = qs.stringify({ case: caseId }, { addQueryPrefix: true })
  return useApiRequest<Components.Schemas.PaginatedSummonList>({
    ...options,
    url: `${ makeApiUrl("summons") }${ queryString }`,
    lazy: caseId === undefined,
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useDecisions = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.Decision>({
    ...options,
    url: makeApiUrl("decisions"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

// TODO-MOCKED replace with real endpoint
export const useCorrespondences = (options?: Options) => {
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
export const useCorrespondence = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<MockComponents.Schemas.Correspondence>({
    ...options,
    lazy: true,
    url: "correspondence",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true
  })
}

export const useCaseClose = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseClose>({
    ...options,
    lazy: true,
    url: makeApiUrl("case-close"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseCloseReasons = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseCloseReasonList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "case-close-reasons"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseCloseResults = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseCloseResultList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "case-close-results"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCitizenReports = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CitizenReport>({
    ...options,
    lazy: true,
    url: makeApiUrl("cases", caseId, "citizen-reports"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useCaseTasks = (caseId: Components.Schemas.Case["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CaseWorkflow[]>({
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
    lazy: true,
    url: makeApiUrl("visits"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useDueDate = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.CamundaDateUpdate>({
    ...options,
    url: makeApiUrl("camunda/task/date"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}
