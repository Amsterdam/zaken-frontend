import { FC } from "react"
import styled from "styled-components"
import { Button, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import to from "app/routing/utils/to"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import AddTaskForm from "app/components/case/tasks/AddTask/AddTaskForm"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  display: flex;
`

const StyledButton = styled(Button)`
  color: ${ themeColor("tint", "level0") };
  margin-left: ${ themeSpacing(2) };
  margin-top: ${ themeSpacing(1) };
`

const TaskForm: FC<Props> = ({ id }) => (
  <Div>
    <AddTaskForm caseId={ id } />
    <ButtonLink to={ to("/zaken/:id/afronden", { id }) }>
      <StyledButton variant="tertiary">Afronden</StyledButton>
    </ButtonLink>
  </Div>
)

export default TaskForm