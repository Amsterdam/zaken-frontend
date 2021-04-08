import { FC } from "react"
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import TaskForm from "./TaskForm"
import Workflow from "../Workflow/Workflow"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(16) };
`

const CaseStatus: FC<Props> = ({ id }) => (
  <>
    <Div>
      <Heading as="h2">Status</Heading>
      <TaskForm id={ id } />
    </Div>
    <StyledDivider />
    <Workflow id={ id } />
  </>
)


export default CaseStatus