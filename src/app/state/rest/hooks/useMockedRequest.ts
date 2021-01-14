import { useCallback } from "react"
import { Method } from "axios"

import mockData from "__mocked__/data"

type MockDataKey = keyof typeof mockData

const timeout = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms))
const getUrlId = (url: string) => {
  const parts = url.split("/")
  const n = parseInt(parts[1], 10)
  return !Number.isNaN(n) ? [parts[0], n] : undefined
}

export default () => useCallback(
  async <Schema>(method: Method, url: string, requestData?: unknown, headers = {}) => {
    await timeout(60)
    const urlId = getUrlId(url)
    const data = method === "get" ?
      urlId !== undefined ?
        ((mockData[urlId[0] as MockDataKey] as Array<any>)?.find((item: { id: number }) => item.id === urlId[1]) as Schema) :
        mockData[url as MockDataKey] :
      undefined
    return { data }
  },
  []
)
