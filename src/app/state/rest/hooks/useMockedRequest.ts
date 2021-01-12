import { useCallback } from "react"
import { Method } from "axios"

import mockData from "__mocked__/data"

const timeout = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms))

export default () => useCallback(
  async (method: Method, url: string, data?: unknown, headers = {}) => {
    await timeout(100)
    return { data: mockData[url as keyof typeof mockData] }
  },
  []
)
