import to from "./to"

describe("to", () => {
  it("should should apply route params when given", () => {
    expect(to("/poc/foo/:bar/", { bar: "barValue" })).toEqual("/poc/foo/barValue/")
  })
})
