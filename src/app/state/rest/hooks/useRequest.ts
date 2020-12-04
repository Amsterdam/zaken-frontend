import { useCallback } from "react"
import axios, { Method, AxiosError } from "axios"

export type RequestError = AxiosError

export default () => useCallback(async (method: Method, url: string, data?: unknown, headers = {}) => {
    const response = await axios.request({
      method,
      url,
      headers,
      data
    })
    return response
  }, [])
