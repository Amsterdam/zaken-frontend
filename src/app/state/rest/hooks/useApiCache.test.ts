import { renderHook, act } from "@testing-library/react-hooks"
import { useApiCache } from "./useApiCache"

describe("useApiCache", () => {
  it("should return undefined when an item was not set", () => {
    const { result } = renderHook(() => useApiCache())
    expect(result.current.getCacheItem("my/path")).toEqual(undefined)
  })

  it("should be able to set an item", () => {
    const { result } = renderHook(() => useApiCache())
    act(() => {
      result.current.setCacheItem("my/path", { foo: "bar" })
    })
    expect(result.current.getCacheItem("my/path")).toEqual({ valid: true, value: { foo: "bar" }, errors: [] })
  })

  it("should be able to clear a group", () => {
    const { result } = renderHook(() => useApiCache())
    act(() => {
      result.current.setCacheItem("my/path", { foo: "group1" })
      result.current.clearCache()
    })
    expect(result.current.getCacheItem("my/path")).toEqual({ valid: false, value: { foo: "group1" }, errors: [] })
  })
})
