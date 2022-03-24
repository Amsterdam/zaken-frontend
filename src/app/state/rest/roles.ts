import type { Options } from '.';
import { useErrorHandler } from './hooks/utils/errorHandler';
import useApiRequest from './hooks/useApiRequest';

export const useRoles = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<MockComponents.Schemas.Role[]>({
    ...options,
    url: 'roles',
    groupName: 'roles',
    handleError,
    isProtected: true,
    isMocked: true,
  });
};
