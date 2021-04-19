import { FC } from "react"
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import AddTaskForm from "app/components/case/tasks/AddTask/AddTaskForm"
import Workflow from "../Workflow/Workflow"
import { Row, Column, RowWithColumn } from "app/components/layouts/Grid"

type Props = {
  id: Components.Schemas.Case["id"]
}

const StyledHeading = styled(Heading)`
  margin-top: 30px;
  margin-bottom: 0;
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(16) };
`

const FORM_WIDTH = 40

const CaseStatus: FC<Props> = ({ id }) => (
  <>
    <Row bottomSpacing={ 0 }>
      <Column spanLarge={ 100 - FORM_WIDTH }>
        <StyledHeading as="h2">Status</StyledHeading>
      </Column>
      <Column spanLarge={ FORM_WIDTH }>
        <AddTaskForm id={ id } />
      </Column>
    </Row>
    <RowWithColumn>
      <StyledDivider />
      <Workflow id={ id } />
    </RowWithColumn>
  </>
)


export default CaseStatus