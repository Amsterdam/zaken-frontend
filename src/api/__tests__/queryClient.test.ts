import { showApiErrorToast } from "@/api/queryClient"
import { registerToastBridge } from "@/components/toasts/toastBridge"

describe("showApiErrorToast", () => {
  const showToast = vi.fn()

  let time = Date.now()

  beforeEach(() => {
    // Each test past the time in which the same error is not shown again.
    time += 10_000
    vi.useFakeTimers()
    vi.setSystemTime(time)
    showToast.mockClear()
    registerToastBridge(showToast)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("shows an error toast", () => {
    showApiErrorToast({ status: 500, message: "Internal Server Error" })

    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Oeps, iets ging mis!",
        severity: "error",
      }),
    )
  })

  it("handles network errors that never reached the API", () => {
    showApiErrorToast(new TypeError("Failed to fetch"))

    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Oeps, iets ging mis!" }),
    )
  })

  it("shows the same error once while its toast is there", () => {
    showApiErrorToast({ status: 500, message: "Internal Server Error" })
    showApiErrorToast({ status: 502, message: "Bad Gateway" })
    expect(showToast).toHaveBeenCalledTimes(1)

    // Another error is another toast.
    showApiErrorToast({ status: 404, message: "Not Found" })
    expect(showToast).toHaveBeenCalledTimes(2)

    vi.advanceTimersByTime(5000)
    showApiErrorToast({ status: 404, message: "Not Found" })
    expect(showToast).toHaveBeenCalledTimes(3)
  })
})
