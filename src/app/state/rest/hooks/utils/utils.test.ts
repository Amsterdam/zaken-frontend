// Module mocking should always be on top:
// -----------------------------------------
import { renderHook } from "@testing-library/react-hooks"
import { AxiosError } from "axios"

import { makeGatewayUrl, getHeaders, useErrorHandler } from "./utils"

const mockAddErrorFlashMessage = jest.fn()
jest.mock("app/state/flashMessages/useFlashMessages", () => ({
  __esModule: true,
  useFlashMessages: () => ({ addErrorFlashMessage: mockAddErrorFlashMessage })
}))

describe("rest hook utils", () => {
  describe("useErrorHandler", () => {
    beforeEach(() => {
      mockAddErrorFlashMessage.mockReset()
    })

    it ("should return a callback pushes a flash message", () => {
      const mockedError: AxiosError = {
        isAxiosError: true,
        name: "error",
        message: "S.O.S.",
        config: { url: "http://www.foo.com" },
        toJSON: () => ({})
      }

      const { result } = renderHook(() => useErrorHandler())
      result.current(mockedError)

      expect(mockAddErrorFlashMessage).toHaveBeenCalledWith("Oeps er ging iets mis!", "S.O.S. (URL: http://www.foo.com)")
    })
  })

  describe("getHeaders", () => {
    it("should return s Authorization header", () => {
      jest.spyOn(window.localStorage.__proto__, "getItem")
      window.localStorage.__proto__.getItem = jest.fn(() => "MY TOKEN")

      const headers = getHeaders()
      expect(headers).toEqual({ Authorization: "Bearer MY TOKEN" })
    })
  })

  describe("makeGatewayURL", () => {
    it("should make a GATEWAY url", () => {
      expect(makeGatewayUrl("foo", "bar")).toEqual("http://localhost:8080/api/v1/foo/bar/")
    })
  })
})
