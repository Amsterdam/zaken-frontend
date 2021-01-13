
import useRequest from "./useRequest"
import useProtectedRequest from "./useProtectedRequest"
import useMockedRequest from "./useMockedRequest"

export type { RequestError } from "./useRequest"

export default (isProtected?: boolean, isMocked?: boolean) => {
  const request = useRequest()
  const protectedRequest = useProtectedRequest()
  const mockedRequest = useMockedRequest()
  return isMocked ? mockedRequest : isProtected ? protectedRequest : request
}