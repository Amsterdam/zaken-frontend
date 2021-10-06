import { act, renderHook } from "@testing-library/react-hooks"
import { useRequestQueue } from "./useRequestQueue"

describe("useRequestQueue", () => {
  class Deferred {
    promise: Promise<any>
    reject = () => {}
    resolve = () => {}

    constructor() {
      this.promise = new Promise((resolve: any, reject)=> { //TODO refactor any
        this.reject = reject
        this.resolve = resolve
      })
    }
  }

  it("execute pushed requests in order", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequestQueue())

    const deferred1 = new Deferred()
    const execDeferred1 = jest.fn(() => deferred1.promise)
    const deferred2 = new Deferred()
    const execDeferred2 = jest.fn(() => deferred2.promise)

    act(() => {
      // Pushing two requests:
      result.current.pushRequestInQueue("foo1", "get", execDeferred1)
      result.current.pushRequestInQueue("foo2", "get", execDeferred2)
    })

    expect(execDeferred1).toHaveBeenCalled()                                    // <- Working on first request
    expect(execDeferred2).not.toHaveBeenCalled()                                // <- NOT working on second request

    expect(result.current.isRequestPendingInQueue("foo1", "GET")).toEqual(true)        // <- Both are still pending.
    expect(result.current.isRequestPendingInQueue("foo2", "GET")).toEqual(true)

    await act(() => {
      deferred1.resolve()                                                       // <- Mark first request as done
      return waitForNextUpdate()
    })

    expect(execDeferred2).toHaveBeenCalled()                                    // <- Also working on second request
    expect(result.current.isRequestPendingInQueue("foo1", "GET")).toEqual(false)       // <- First request is not pending anymore
    expect(result.current.isRequestPendingInQueue("foo2", "GET")).toEqual(true)        // <- Second request is.

    await act(() => {
      deferred2.resolve()                                                       // <- Mark second request as done
      return waitForNextUpdate()
    })

    expect(result.current.isRequestPendingInQueue("foo1", "GET")).toEqual(false)       // <- Both are NOT pending anymore
    expect(result.current.isRequestPendingInQueue("foo2", "GET")).toEqual(false)
  })

  it("does NOT push duplicate requests", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequestQueue())

    const deferred1 = new Deferred()
    const execDeferred1 = jest.fn(() => deferred1.promise)
    const deferred2 = new Deferred()
    const execDeferred2 = jest.fn(() => deferred2.promise)

    await act(() => {
      // Pushing two requests:
      result.current.pushRequestInQueue("duplicate", "GET", execDeferred1)
      result.current.pushRequestInQueue("duplicate", "GET", execDeferred2)

      deferred1.resolve()                                                       // <- Mark first request as done
      return waitForNextUpdate()
    })

    expect(execDeferred2).not.toHaveBeenCalled()                                // <- NOT working on second request
  })
})
