import to from "./to"

describe("to", () => {
  it("should should apply route params when given", () => {
    expect(to("/poc/foo/:bar/", { bar: "barValue" })).toEqual("/poc/foo/barValue/")
  })

  it("should should not apply excess route params when given", () => {
    // @ts-ignore
    expect(to("/poc/foo/:bar/", { bar: "barValue", baz: "bazValue" })).toEqual("/poc/foo/barValue/")
  })
})
