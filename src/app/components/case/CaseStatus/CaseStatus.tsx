import React from "react"
import styled from "styled-components"
import { Button, Divider, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import Workflow from "../Workflow/Workflow"
import AddTaskForm from "app/components/case/tasks/AddTask/AddTaskForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  color: ${ themeColor("tint", "level0") };
  margin-left: ${ themeSpacing(2) };
  margin-top: ${ themeSpacing(1) };
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(16) };
`

const CaseStatus: React.FC<Props> = ({ id }) => (
  <>
    <Div>
      <Heading as="h2">
        Status
      </Heading>
      <Div>
        <AddTaskForm caseId={ id } />
        <ButtonLink to={ to("/zaken/:id/afronden", { id }) }>
          <StyledButton variant="tertiary">Afronden</StyledButton>
        </ButtonLink>
      </Div>
    </Div>
    <StyledDivider />
    <Workflow id={ id } />
  </>
)


export default CaseStatus