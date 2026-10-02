import { makeApiUrl } from "@/api/utils/makeApiUrl"

describe("makeApiUrl", () => {
  it("should make an Api url", () => {
    expect(makeApiUrl("foo", "bar")).toEqual(
      "http://localhost:8080/api/v1/foo/bar/",
    )
  })
})
