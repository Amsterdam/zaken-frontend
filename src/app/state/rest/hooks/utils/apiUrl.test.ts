import { makeApiUrl } from "./apiUrl"

describe("makeGatewayURL", () => {
  it("should make a GATEWAY url", () => {
    expect(makeApiUrl("foo", "bar")).toEqual("http://localhost:8080/api/v1/foo/bar/")
  })
})