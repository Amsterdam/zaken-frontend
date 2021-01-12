import { useCallback } from "react"
import { Method } from "axios"

import mockData from "__mocked__/data"

const timeout = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms))
const getUrlId = (url: string) => {
  const parts = url.split("/")
  const n = parseInt(parts[1], 10)
  return !Number.isNaN(n) ? [parts[0], n] : undefined
}

export default () => useCallback(
  async (method: Method, url: string, requestData?: unknown, headers = {}) => {
    await timeout(60)
    const urlId = getUrlId(url)
    const data = method === "get" ?
      urlId !== undefined ?
        mockData[urlId[0] as keyof typeof mockData].find(item => item.id === urlId[1]) :
        mockData[url as keyof typeof mockData] :
      undefined
    return { data }
  },
  []
)
