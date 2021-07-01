import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"

export default (caseItem?: Components.Schemas.Case) => {

  if (caseItem === undefined) return

  const { id, theme: { name }, start_date, reason, project } = caseItem

  const values = [
    ["Zaak ID", <CaseIdDisplay id={ id } />],
    ["Thema", name],
    ["Startdatum", <DateDisplay date={ start_date ?? undefined } emptyText="-" />],
    ["Aanleiding", reason.name],
    project?.name !== undefined ? ["Project", project.name] : undefined
  ].filter((value): value is [string, React.ReactElement] => value !== undefined)

  return Object.fromEntries(values)
}