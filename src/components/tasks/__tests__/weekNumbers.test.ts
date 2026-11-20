import {
  MAX_WEEK_NUMBER,
  MIN_WEEK_NUMBER,
  getCurrentIsoWeekNumber,
  getSortedWeekNumbers,
} from "../weekNumbers"

describe("weekNumbers", () => {
  it("sorts week numbers from the current week and wraps at 53", () => {
    expect(getSortedWeekNumbers(52).slice(0, 5)).toEqual([52, 53, 1, 2, 3])
  })

  it("returns all week numbers from 1 to 53 exactly once", () => {
    const weeks = getSortedWeekNumbers(1)
    expect(weeks).toHaveLength(MAX_WEEK_NUMBER)
    expect(new Set(weeks).size).toBe(MAX_WEEK_NUMBER)
    expect(Math.min(...weeks)).toBe(MIN_WEEK_NUMBER)
    expect(Math.max(...weeks)).toBe(MAX_WEEK_NUMBER)
  })

  it("calculates ISO week numbers", () => {
    expect(getCurrentIsoWeekNumber(new Date("2026-01-01T12:00:00Z"))).toBe(1)
    expect(getCurrentIsoWeekNumber(new Date("2026-12-31T12:00:00Z"))).toBe(53)
  })
})

