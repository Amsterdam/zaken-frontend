import first from "./first"

describe("first", () => {

  it("undefined", () => {
    expect(first(undefined)).toBeUndefined()
  })

  it("empty array", () => {
    expect(first([])).toBeUndefined()
  })

  it("single item", () => {
    expect(first(["a"])).toBe("a")
  })

  it("two items", () => {
    expect(first(["a", "b"])).toBe("a")
  })

  it("three items", () => {
    expect(first(["a", "b", "c"])).toBe("a")
  })

  it("objects", () => {
    expect(first([{ a: "a" }, { b: "b" }, { c: "c" }])).toEqual({ a: "a" })
  })
})