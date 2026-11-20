export const MIN_WEEK_NUMBER = 1
export const MAX_WEEK_NUMBER = 53

export const getCurrentIsoWeekNumber = (date = new Date()) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  )
  const day = utcDate.getUTCDay() || 7
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1))
  return Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

const normalizeWeekNumber = (weekNumber: number) => {
  if (weekNumber < MIN_WEEK_NUMBER || weekNumber > MAX_WEEK_NUMBER) {
    return MIN_WEEK_NUMBER
  }
  return weekNumber
}

export const getSortedWeekNumbers = (currentWeek = getCurrentIsoWeekNumber()) => {
  const normalizedCurrentWeek = normalizeWeekNumber(currentWeek)
  return Array.from(
    { length: MAX_WEEK_NUMBER },
    (_, index) => ((normalizedCurrentWeek - 1 + index) % MAX_WEEK_NUMBER) + 1,
  )
}


