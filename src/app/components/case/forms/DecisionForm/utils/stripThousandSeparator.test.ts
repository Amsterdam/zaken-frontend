import stripThousandSeparator from "./stripThousandSeparator"

describe("stripThousandSeparator", () => {

  it("number", () => {
    expect(stripThousandSeparator(99)).toBe("99")
  })

  it("float", () => {
    expect(stripThousandSeparator(9.98)).toBe("9.98")
  })

  it("Dutch comma float", () => {
    expect(stripThousandSeparator("9,98")).toBe("9,98")
  })

  it("stripThousandSeparator for thousands", () => {
    expect(stripThousandSeparator("1.000.000")).toBe("1000000")
  })

  it("stripThousandSeparator for non thousands", () => {
    expect(stripThousandSeparator("1.00")).toBe("1.00")
  })

  it("separator", () => {
    expect(stripThousandSeparator("1,000,000", ",")).toBe("1000000")
  })
})