export const isDateinPast = (dateToCheck: Date) => {

  const currentDate: number = new Date().getTime()
  const dateToCheckEndOfDay: number = dateToCheck.setHours(23,59,59)

  return (
    dateToCheckEndOfDay - currentDate < 0
  )
}
