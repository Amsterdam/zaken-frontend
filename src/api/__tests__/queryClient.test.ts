import { showApiErrorFlashMessage } from "@/api/queryClient"
import { registerFlashMessageBridge } from "app/state/flashMessages/flashMessageBridge"

describe("showApiErrorFlashMessage", () => {
  const addErrorFlashMessage = vi.fn()
  let unregister: () => void

  beforeEach(() => {
    addErrorFlashMessage.mockClear()
    unregister = registerFlashMessageBridge(addErrorFlashMessage)
  })

  afterEach(() => {
    unregister()
  })

  it("shows the detail from the API and the url, like the old useErrorHandler", () => {
    showApiErrorFlashMessage({
      status: 400,
      message: "Bad Request",
      detail: "Ongeldige invoer.",
      url: "https://api.test/themes/",
    })

    expect(addErrorFlashMessage).toHaveBeenCalledWith(
      "Oeps er ging iets mis!",
      "Ongeldige invoer. (URL: https://api.test/themes/)",
    )
  })

  it("falls back to the message when there is no detail", () => {
    showApiErrorFlashMessage({
      status: 500,
      message: "Internal Server Error",
      url: "https://api.test/themes/",
    })

    expect(addErrorFlashMessage).toHaveBeenCalledWith(
      "Oeps er ging iets mis!",
      "Internal Server Error (URL: https://api.test/themes/)",
    )
  })

  it("handles network errors that never reached the API", () => {
    showApiErrorFlashMessage(new TypeError("Failed to fetch"))

    expect(addErrorFlashMessage).toHaveBeenCalledWith(
      "Oeps er ging iets mis!",
      "Failed to fetch (URL: -)",
    )
  })

  it("does nothing when no FlashMessageProvider is mounted", () => {
    unregister()

    expect(() => showApiErrorFlashMessage(new Error("boom"))).not.toThrow()
    expect(addErrorFlashMessage).not.toHaveBeenCalled()
  })
})
