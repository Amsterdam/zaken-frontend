import { DateDisplay } from "@amsterdam/wonen-ui"

export default (resident: Components.Schemas.Resident) => {

  const { geboortedatum, datum_begin_relatie_verblijfadres } = resident

  const values = [
    ["Geboren", <DateDisplay date={ geboortedatum } />],
    ["Ingeschreven sinds", <DateDisplay date={ datum_begin_relatie_verblijfadres } />]
  ]

  return Object.fromEntries(values)
}