import { renderHook, act } from "@testing-library/react-hooks"
import { useApiCache } from "./useApiCache"

describe("useApiCache", () => {
  it("should return undefined when an item was not set", () => {
    const { result } = renderHook(() => useApiCache())
    expect(result.current.getCacheItem("group", "my/path")).toEqual(undefined)
  })

  it("should be able to set an item", () => {
    const { result } = renderHook(() => useApiCache())
    act(() => {
      result.current.setCacheItem("group", "my/path", { foo: "bar" })
    })
    expect(result.current.getCacheItem("group", "my/path")).toEqual({ foo: "bar" })
  })

  it("should be able to clear a group", () => {
    const { result } = renderHook(() => useApiCache())
    act(() => {
      result.current.setCacheItem("group1", "my/path", { foo: "group1" })
      result.current.setCacheItem("group2", "my/path", { foo: "group2" })
      result.current.clearCache("group1")
    })
    expect(result.current.getCacheItem("group1", "my/path")).toEqual(undefined)
    expect(result.current.getCacheItem("group2", "my/path")).toEqual({ foo: "group2" })
  })
})
