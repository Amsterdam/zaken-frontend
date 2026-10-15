import { renderValue } from "../renderValue"

describe("a value in the history of a case", () => {
  it("shows a date with the Dutch names of the day and the month", () => {
    expect(renderValue("2026-10-12", "date")).toBe("Maandag 12 oktober 2026")
    expect(renderValue("2026-10-12T14:05:00+02:00", "date")).toBe(
      "Maandag 12 oktober 2026",
    )
  })
})
