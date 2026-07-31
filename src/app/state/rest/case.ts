import type { Options } from "./";
import { useErrorHandler } from "./hooks/utils/errorHandler";
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl";
import useApiRequest from "./hooks/useApiRequest";
import qs from "qs";

export const useCase = (id?: components["schemas"]["CaseCreate"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["CaseCreate"]>({
    lazy: id === undefined,
    ...options,
    url: makeApiUrl("cases", id),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseCreate = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<any, any>({
    lazy: true,
    ...options,
    url: makeApiUrl("cases"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseEvents = (caseId: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["CaseEvent"][]>({
    ...options,
    url: makeApiUrl("cases", caseId, "events"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useDebriefingCreate = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["DebriefingCreate"]>({
    lazy: true,
    ...options,
    url: makeApiUrl("debriefings"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

// Post a summon
export const useSummons = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["Summon"]>({
    ...options,
    url: makeApiUrl("summons"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

// Get summons for a specific case
export const useSummonsWithCaseId = (caseId?: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  const queryString = qs.stringify({ case: caseId }, { addQueryPrefix: true });
  return useApiRequest<components["schemas"]["PaginatedSummonList"]>({
    ...options,
    url: `${ makeApiUrl("summons") }${ queryString }`,
    lazy: caseId === undefined,
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useDecisions = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["Decision"]>({
    ...options,
    url: makeApiUrl("decisions"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useQuickDecisions = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["QuickDecision"]>({
    ...options,
    url: makeApiUrl("quick-decisions"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

// TODO-MOCKED replace with real endpoint
export const useCorrespondences = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<MockComponents.Schemas.Correspondence[]>({
    ...options,
    url: "correspondence",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true,
  });
};

// TODO-MOCKED replace with real endpoint
export const useCorrespondence = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<MockComponents.Schemas.Correspondence>({
    ...options,
    lazy: true,
    url: "correspondence",
    groupName: "cases",
    handleError,
    isProtected: true,
    isMocked: true,
  });
};

export const useCaseClose = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["CaseClose"]>({
    ...options,
    url: makeApiUrl("case-close"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseCloseReasons = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedCaseCloseReasonList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "case-close-reasons"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseCloseResults = (themeId?: components["schemas"]["CaseTheme"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedCaseCloseResultList"]>({
    ...options,
    lazy: themeId === undefined,
    url: makeApiUrl("themes", themeId, "case-close-results"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCitizenReports = (caseId: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["CitizenReport"]>({
    ...options,
    lazy: true,
    url: makeApiUrl("cases", caseId, "citizen-reports"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useTaskComplete = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["GenericCompletedTask"]>({
    ...options,
    url: makeApiUrl("generic-tasks", "complete"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseVisits = (caseId: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["Visit"]>({
    ...options,
    url: makeApiUrl("cases", caseId, "visits"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useVisitsCreate = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["Visit"]>({
    ...options,
    lazy: true,
    url: makeApiUrl("visits"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useCaseWorkflows = (caseId: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<Tasks.PaginatedWorkflowList>({
    ...options,
    url: makeApiUrl("cases", caseId, "workflows"),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};
