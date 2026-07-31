import type { Options } from ".";
import { useErrorHandler } from "./hooks/utils/errorHandler";
import { makeApiUrl } from "./hooks/utils/apiUrl";
import useApiRequest from "./hooks/useApiRequest";

export const useCaseThemes = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedCaseThemeList"]>({
    ...options,
    url: makeApiUrl("themes"),
    groupName: "themes",
    handleError,
    isProtected: true,
  });
};

export const useReasons = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedCaseReasonList"]>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "reasons"),
    groupName: "themes",
    handleError,
    isProtected: true,
  });
};

export const useProjects = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedCaseProjectList"]>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "case-projects"),
    groupName: "themes",
    handleError,
    isProtected: true,
  });
};


export const useSubjects = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedSubjectList"]>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "subjects"),
    groupName: "themes",
    handleError,
    isProtected: true,
  });
};


// useSummonTypes for getting the available summonTypes for a specific theme
export const useSummonTypes = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedSummonTypeList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "summon-types"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useTags = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedTagList"]>({
    lazy: themeId === undefined,
    ...options,
    url: makeApiUrl("themes", themeId, "tags"),
    groupName: "themes",
    handleError,
    isProtected: true,
  });
};

export const useDecisionTypes = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedDecisionTypeList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "decision-types"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useQuickDecisionTypes = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedQuickDecisionTypeList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "quick-decision-types"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useScheduleTypes = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["ThemeScheduleTypes"]>({
    ...options,
    lazy: options?.lazy ?? themeId === undefined,
    url: makeApiUrl("themes", themeId, "schedule-types"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useViolationTypes = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedViolationTypeList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "violation-types"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

