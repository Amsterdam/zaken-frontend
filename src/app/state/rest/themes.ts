import type { Options } from "."
import { useErrorHandler } from "./hooks/utils/errorHandler"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import useApiRequest from "./hooks/useApiRequest"

export const useCaseThemes = (options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseThemeList>({
    ...options,
    url: makeApiUrl("themes"),
    groupName: "themes",
    handleError,
    isProtected: true
  })
}

export const useReasons = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseReasonList>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "reasons"),
    groupName: "themes",
    handleError,
    isProtected: true
  })
}

export const useProjects = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedCaseProjectList>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "case-projects"),
    groupName: "themes",
    handleError,
    isProtected: true
  })
}


export const useSubjects = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSubjectList>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "subjects"),
    groupName: "themes",
    handleError,
    isProtected: true
  })
}


// useSummonTypes for getting the available summonTypes for a specific theme
export const useSummonTypes = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedSummonTypeList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "summon-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useTags = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedTagList>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "tags"),
    groupName: "themes",
    handleError,
    isProtected: true
  })
}

export const useDecisionTypes = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedDecisionTypeList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "decision-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useQuickDecisionTypes = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedQuickDecisionTypeList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "quick-decision-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useScheduleTypes = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.ThemeScheduleTypes>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "schedule-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

export const useViolationTypes = (themeId?: Components.Schemas.CaseTheme["id"], options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Components.Schemas.PaginatedViolationTypeList>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "violation-types"),
    groupName: "cases",
    handleError,
    isProtected: true
  })
}

