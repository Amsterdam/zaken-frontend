import useRequest from './useRequest';
import useProtectedRequest from './useProtectedRequest';
import useMockedRequest from './useMockedRequest';
import useMockExtendedRequest from './useMockExtendedRequest';

export type { RequestError, Method } from './useRequest';

export default (isProtected?: boolean, isMocked?: boolean, isMockExtended?: boolean) => {
  const request = useRequest();
  const protectedRequest = useProtectedRequest();
  const mockedRequest = useMockedRequest();
  const mockExtendedRequest = useMockExtendedRequest(isProtected);
  return (
    isMockExtended ? mockExtendedRequest
      : isMocked ? mockedRequest
        : isProtected ? protectedRequest
          : request
  );
};
