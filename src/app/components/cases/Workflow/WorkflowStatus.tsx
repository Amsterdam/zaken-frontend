import React from "react"
import { Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import Table from "app/components/shared/Table/Table"

type CellContent = React.ReactNode

type Props = {
  status: string
  data?: {
    href?: string
    itemList?: Array<CellContent>
  }[]
  showBWVMessage?: boolean
}

const StyledTable = styled(Table)`
  margin-bottom: ${ themeSpacing(5) };
  th {
    color: ${ themeColor("tint", "level4") };
  }
  td {
    line-height: ${ themeSpacing(12) };
    padding: ${ themeSpacing(1) } ${ themeSpacing(3) };
    * {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(5) };
`

const columns = [
  { minWidth: 50 },
  { header: "Actuele taken", minWidth: 100 },
  { header: "Uitvoerder", minWidth: 100 },
  { header: "Slotdatum", minWidth: 100 },
  { header: "Verwerking taak", minWidth: 140 }
]

const WorkflowStatus: React.FC<Props> = ({ status, data, showBWVMessage }) =>
  <>
    <StyledHeading as="h3">{ status }</StyledHeading>
    <StyledTable
      columns={columns}
      data={ data }
      noValuesPlaceholder=""
    />
    { showBWVMessage && <small>Het zaaksysteem geeft voor nu alleen een weergave van de taken. De uitvoering/verwerking vindt dus gewoon nog plaats in BWV.</small>}
  </>

export default WorkflowStatus
