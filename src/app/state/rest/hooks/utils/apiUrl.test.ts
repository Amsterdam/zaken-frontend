import { makeApiUrl, stripApiHostFromUrl } from "./apiUrl"

describe("makeApiUrl", () => {
  it("should make an Api url", () => {
    expect(makeApiUrl("foo", "bar")).toEqual("http://localhost:8080/api/v1/foo/bar/")
  })
})

describe("stripApiHostFromUrl", () => {
  it("should make a GATEWAY url", () => {
    expect(stripApiHostFromUrl("http://localhost:8080/api/v1/foo/bar/")).toEqual("foo/bar/")
  })
})