import type { Options } from ".";
import { useErrorHandler } from "./hooks/utils/errorHandler";
import { makeApiUrl } from "./hooks/utils/apiUrl";
import useApiRequest from "./hooks/useApiRequest";

export const useWorkflowProcesses = (id: components["schemas"]["Case"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["WorkflowOption"][]>({
    ...options,
    url: makeApiUrl(`cases/${ id }/processes`),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};

export const useWorkflowProcess = (id: components["schemas"]["CaseDetail"]["id"], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["StartWorkflow"]>({
    ...options,
    lazy: true,
    url: makeApiUrl(`cases/${ id }/processes/start`),
    groupName: "cases",
    handleError,
    isProtected: true,
  });
};