import type { Options } from ".";
import { useErrorHandler } from "./hooks/utils/errorHandler";
import { makeApiUrl } from "./hooks/utils/apiUrl";
import useApiRequest from "./hooks/useApiRequest";

export const useUsers = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["PaginatedUserList"]>({
    ...options,
    url: makeApiUrl("users"),
    groupName: "users",
    handleError,
    isProtected: true,
  });
};

export const useUsersMe = (options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<components["schemas"]["UserDetail"]>({
    ...options,
    url: makeApiUrl("users", "me"),
    groupName: "auth",
    handleError,
    isProtected: true,
  });
};