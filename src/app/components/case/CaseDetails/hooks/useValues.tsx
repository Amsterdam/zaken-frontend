import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"

export default (caseItem?: Components.Schemas.Case) => {

  if (caseItem === undefined) return

  const { id, team: { name }, start_date } = caseItem

  const values = [
    ["Zaak ID", <CaseIdDisplay id={ id } />],
    ["Thema", name],
    ["Startdatum", start_date ? <DateDisplay date={ start_date } /> : "-"]
  ]

  return Object.fromEntries(values)
}