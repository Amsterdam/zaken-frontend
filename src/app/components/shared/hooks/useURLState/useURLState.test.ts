import { renderHook, act } from "@testing-library/react-hooks"
import useURLState from "./useURLState"

describe("useURLState", () => {
  it("should set search param", () => {
    const { result, waitForNextUpdate } = renderHook(() => useURLState("q"))
    const [, set] = result.current
    act(() => { set("Abc") })
    waitForNextUpdate()
    const [value] = result.current
    expect(value).toBe("Abc")
    expect(window.location.search).toBe("?q=Abc")
  })

  it("should read search param", () => {
    const { result } = renderHook(() => useURLState("q"))
    const [value] = result.current
    expect(value).toBe("Abc")
  })

  it("parse", () => {
    const { result } = renderHook(() => useURLState("q", () => ""))
    const [value] = result.current
    expect(value).toBe("")
  })
})
