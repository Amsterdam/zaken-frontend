import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type ThemeId = components["schemas"]["CaseTheme"]["id"]

export const useCaseThemes = () => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.list(),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseThemeList"]>(
        makeApiUrl("themes"),
      ),
  })
}

export const useReasons = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.reasons(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseReasonList"]>(
        makeApiUrl("themes", themeId, "reasons"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useProjects = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.projects(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedCaseProjectList"]>(
        makeApiUrl("themes", themeId, "case-projects"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useSubjects = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.subjects(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedSubjectList"]>(
        makeApiUrl("themes", themeId, "subjects"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useTags = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.themes.tags(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedTagList"]>(
        makeApiUrl("themes", themeId, "tags"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useDecisionTypes = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.decisionTypes(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedDecisionTypeList"]>(
        makeApiUrl("themes", themeId, "decision-types"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useQuickDecisionTypes = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.quickDecisionTypes(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedQuickDecisionTypeList"]>(
        makeApiUrl("themes", themeId, "quick-decision-types"),
      ),
    enabled: themeId !== undefined,
  })
}

export const useScheduleTypes = (
  themeId?: ThemeId,
  options?: { enabled?: boolean },
) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.scheduleTypes(themeId),
    queryFn: () =>
      fetch<components["schemas"]["ThemeScheduleTypes"]>(
        makeApiUrl("themes", themeId, "schedule-types"),
      ),
    enabled: themeId !== undefined && (options?.enabled ?? true),
  })
}

export const useViolationTypes = (themeId?: ThemeId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.violationTypes(themeId),
    queryFn: () =>
      fetch<components["schemas"]["PaginatedViolationTypeList"]>(
        makeApiUrl("themes", themeId, "violation-types"),
      ),
    enabled: themeId !== undefined,
  })
}
