import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import ChangeableSubject from "../../tasks/ChangeSubject/ChangeableSubject"

export default (caseItem?: Components.Schemas.Case) => {

  if (caseItem === undefined) return

  const { id, theme: { name }, start_date, reason, project, subjects } = caseItem

  const subjectsTODO = ["Niet", "kloppen"]
  
  const values = [
    ["Zaak ID", <CaseIdDisplay id={ id } />],
    ["Thema", name],
    ["Startdatum", <DateDisplay date={ start_date ?? undefined } emptyText="-" />],
    ["Aanleiding", project?.name !== undefined ? `Project: ${ project.name }` : reason.name],

    // TODO make dynamic by using subject
    ["Onderwerp(en)", <ChangeableSubject subjects={ subjectsTODO } caseId={ id } />]
  ]

  return Object.fromEntries(values)
}