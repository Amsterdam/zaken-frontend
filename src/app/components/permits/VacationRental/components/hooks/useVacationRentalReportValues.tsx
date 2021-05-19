import { DateDisplay } from "@amsterdam/wonen-ui"

export default (checkInDate: string, checkOutDate: string) => {
  const values = [
    ["Check in", <DateDisplay date={ checkInDate } />],
    ["Check out", <DateDisplay date={ checkOutDate } />]
  ]
  return Object.fromEntries(values)
}