import { formatHouseNumber } from "../formatHouseNumber"

describe("formatHouseNumber", () => {
  it("puts the letter after the number and the addition after a dash", () => {
    expect(
      formatHouseNumber({ number: 26, suffix_letter: "A", suffix: "1" }),
    ).toBe("26A-1")
  })

  it("has only the letter", () => {
    expect(
      formatHouseNumber({ number: 26, suffix_letter: "A", suffix: null }),
    ).toBe("26A")
  })

  it("has only the addition", () => {
    expect(
      formatHouseNumber({ number: 1, suffix_letter: null, suffix: "H" }),
    ).toBe("1-H")
  })

  it("has only the number", () => {
    expect(formatHouseNumber({ number: 1 })).toBe("1")
  })
})
