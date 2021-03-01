import { useCallback } from "react"
import merge from "lodash.merge"

import useRequest, { Method } from "./useRequest"
import useProtectedRequest from "./useProtectedRequest"
import useMockedRequest from "./useMockedRequest"
import { stripApiHostFromUrl } from "./utils/apiUrl"

export default (isProtected?: boolean) => {
  const request = useRequest()
  const protectedRequest = useProtectedRequest()
  const requestMethod = isProtected ? protectedRequest : request
  const mockedRequest = useMockedRequest()

  return useCallback(
    async <Schema>(method: Method, url: string, data?: unknown, headers = {}) => {
      const response = await requestMethod<Schema>(method, url, data, headers)
      if (method !== "get") return response
      const mockedResponse = await mockedRequest(method, stripApiHostFromUrl(url), data, headers)
      return merge(response, mockedResponse)
    },
    [requestMethod, mockedRequest]
  )
}
