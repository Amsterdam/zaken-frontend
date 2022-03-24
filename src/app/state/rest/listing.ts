import type { Options } from '.';
import { useErrorHandler } from './hooks/utils/errorHandler';
import { makeTonApiUrl } from './hooks/utils/apiUrl';
import useApiRequest from './hooks/useApiRequest';

export const useListing = (tonId?: number, options?: Options) => {
  const handleError = useErrorHandler();
  return useApiRequest<TON.Schemas.Listing>({
    ...options,
    lazy: tonId === undefined,
    url: makeTonApiUrl('listings', tonId),
    groupName: 'listings',
    handleError,
    isProtected: true,
  });
};
