import styled from "styled-components"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import ChangeableSubject from "../../tasks/ChangeSubject/ChangeableSubject"
import SensitiveCaseIcon from "../../SensitiveCaseIcon/SensitiveCaseIcon"

const Wrap = styled.div`
  display: flex;
`

export default (isClosed: boolean, caseItem?: Components.Schemas.Case) => {

  if (caseItem === undefined) return

  const { id, theme, start_date, reason, project, sensitive, subjects } = caseItem

  const values = [
    ["Zaak ID",
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
      </Wrap>
    ],
    ["Thema", theme.name],
    ["Startdatum", <DateDisplay date={ start_date ?? undefined } emptyText="-" />],
    ["Aanleiding", project?.name !== undefined ? `Project: ${ project.name }` : reason.name],
    ["Onderwerp(en)", isClosed
      ? subjects.map((subject) => subject.name).join(", ")
      : <ChangeableSubject subjects={ subjects } caseId={ id } themeId={ theme.id } />]
  ]

  return Object.fromEntries(values)
}
