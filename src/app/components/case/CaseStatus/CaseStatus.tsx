import { FC } from "react"
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import AddTaskForm from "app/components/case/tasks/AddTask/AddTaskForm"
import Workflow from "../Workflow/Workflow"
import { Row, Column, RowWithColumn } from "app/components/layouts/Grid"

type Props = {
  id: Components.Schemas.Case["id"]
}

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(16) };
`

const FORM_WIDTH = 35

const CaseStatus: FC<Props> = ({ id }) => (
  <>
    <Row bottomSpacing={ 0 }>
      <Column spanLarge={ 100 - FORM_WIDTH }>
        <Heading as="h2">Status</Heading>
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