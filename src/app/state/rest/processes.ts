import type { Options } from '.';
import { useErrorHandler } from './hooks/utils/errorHandler';
import { makeApiUrl } from './hooks/utils/apiUrl';
import useApiRequest from './hooks/useApiRequest';

export const useWorkflowProcesses = (id: Components.Schemas.Case['id'], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<Components.Schemas.WorkflowOption[]>({
    ...options,
    url: makeApiUrl(`cases/${id}/processes`),
    groupName: 'cases',
    handleError,
    isProtected: true,
  });
};

export const useWorkflowProcess = (id: Components.Schemas.Case['id'], options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<Components.Schemas.StartWorkflow>({
    ...options,
    lazy: true,
    url: makeApiUrl(`cases/${id}/processes/start`),
    groupName: 'cases',
    handleError,
    isProtected: true,
  });
};
