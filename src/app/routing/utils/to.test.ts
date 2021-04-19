import to from "./to"

describe("to", () => {
  it("should apply route params when given", () => {
    expect(to("/poc/foo/:bar/", { bar: "barValue" })).toEqual("/poc/foo/barValue/")
  })

  it("should not apply excess route params when given", () => {
    expect(to("/poc/foo/:bar/", { bar: "barValue", baz: "bazValue" })).toEqual("/poc/foo/barValue/")
  })
})
