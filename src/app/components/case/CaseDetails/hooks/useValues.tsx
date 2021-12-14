import styled from "styled-components"
import { CaseIdDisplay, DateDisplay } from "@amsterdam/wonen-ui"
import SensitiveCaseIcon from "../../SensitiveCaseIcon/SensitiveCaseIcon"

const Wrap = styled.div`
  display: flex;
`

export default (caseItem?: Components.Schemas.Case) => {

  if (caseItem === undefined) return

  const { id, theme: { name }, start_date, reason, project, sensitive } = caseItem

  const values = [
    ["Zaak ID",
      <Wrap>
        <CaseIdDisplay id={ id } />
        <SensitiveCaseIcon sensitive={ sensitive }/>
      </Wrap>
    ],
    ["Thema", name],
    ["Startdatum", <DateDisplay date={ start_date ?? undefined } emptyText="-" />],
    ["Aanleiding", project?.name !== undefined ? `Project: ${ project.name }` : reason.name]
  ]

  return Object.fromEntries(values)
}