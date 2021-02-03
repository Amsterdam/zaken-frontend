import formatPostalCode from "./formatPostalCode"

describe("formatPostalCode", () => {
  it("format", () => {
    expect(formatPostalCode("1234 AB")).toBe("1234 AB")
  })
  it("add whitespace", () => {
    expect(formatPostalCode("1234AB")).toBe("1234 AB")
  })
  it("remove hyphen", () => {
    expect(formatPostalCode("1234-AB")).toBe("1234 AB")
  })
  it("remove underscore", () => {
    expect(formatPostalCode("1234_AB")).toBe("1234 AB")
  })
  it("clean whitespace", () => {
    expect(formatPostalCode(" 1234  AB ")).toBe("1234 AB")
  })
})