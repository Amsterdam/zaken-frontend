// Module mocking should always be on top:
// -----------------------------------------
import { renderHook } from "@testing-library/react-hooks"
import { AxiosError, AxiosRequestHeaders } from "axios"
// import { useFlashMessages } from "../../../flashMessages/useFlashMessages"

import { useErrorHandler } from "./errorHandler"

const mockAddErrorFlashMessage = vi.fn()
vi.mock("../../../flashMessages/useFlashMessages", () => ({
  __esModule: true,
  useFlashMessages: () => ({ addErrorFlashMessage: mockAddErrorFlashMessage })
}))

describe("rest hook utils", () => {
  describe("useErrorHandler", () => {
    beforeEach(() => {
      mockAddErrorFlashMessage.mockReset()
    })

    it("should return a callback pushes a flash message", () => {
      const mockedError: AxiosError = {
        isAxiosError: true,
        name: "error",
        message: "S.O.S.",
        config: { url: "http://www.foo.com", headers: {} as AxiosRequestHeaders },
        toJSON: () => ({})
      }

      const { result } = renderHook(() => useErrorHandler())
      result.current(mockedError)

      expect(mockAddErrorFlashMessage).toHaveBeenCalledWith("Oeps er ging iets mis!", "S.O.S. (URL: http://www.foo.com)")
    })
  })
})
