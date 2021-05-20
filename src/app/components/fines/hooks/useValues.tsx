import { DateDisplay } from "@amsterdam/wonen-ui"

export default (fine: Components.Schemas.Fine) => {

  const { identificatienummer, invorderingstatus, dagtekening } = fine

  const values = [
    ["Kenmerk", identificatienummer],
    ["Status", invorderingstatus !== undefined ? "Opgepakt" : "Onbekend"],
    ["Datum", dagtekening ? <DateDisplay date={ fine.dagtekening } /> : "-"]
  ]

  return Object.fromEntries(values)
}
