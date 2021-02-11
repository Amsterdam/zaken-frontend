import React, { useCallback, useMemo } from "react"
import { Button, Icon, Spinner, themeSpacing } from "@amsterdam/asc-ui"

import { useTaskComplete } from "app/state/rest"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import WorkflowStatus from "./WorkflowStatus"
import LockOpen from "@material-ui/icons/LockOpen"
import CompleteTaskButton from "app/components/case/tasks/CompleteTask/CompleteTaskButton"
import styled from "styled-components"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { isDateInPast } from "app/components/shared/Date/helpers"
import { capitalizeString } from "app/components/shared/Helpers/helpers"

type Props = {
  caseId: Components.Schemas.Case["id"]
  tasks?: Components.Schemas.CamundaTask[]
}
type TaskAction = {
  name: string
  target: string
}

type DateProps = {
  isDateInPast: boolean
}

const StyledIcon = styled(Icon)`
  padding-top: ${ themeSpacing(2) };
`
const Ul = styled.ul`
  list-style: none;
  padding: 15px 0 0;
  margin: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
    line-height: 1.15;
  }
`

const DateInPast = styled.span<DateProps>`
color: ${ props => props.isDateInPast ? "red" : "black" };
`

const mapArrayToList = (list: any[]) =>
  <Ul>
    { list.map((item: any, index: number) =>
        <li key={ index }>{ capitalizeString(item) }</li>
    )}
  </Ul>

export const taskActionMap = {
  task_create_visit: { name: "Resultaat huisbezoek", target: "huisbezoek" },
  task_create_debrief: { name: "Debrief verwerken", target: "debriefing" },
  task_create_summon: { name: "Aanschrijving verwerken", target: "aanschrijving" }
} as Record<string, TaskAction>

const Workflow: React.FC<Props> = ({ caseId, tasks }) => {

  const { execPost } = useTaskComplete({ lazy: true })
  const mapTaskData = useCallback((task) => {
    const action = taskActionMap[task.task_name_id] ?? {}

    const onSubmitTaskComplete = () => (
      execPost({ case: caseId, camunda_task_id: task.camunda_task_id, variables: {} })
    )
    return ({
      itemList: [
        <StyledIcon size={32}>{ <LockOpen /> }</StyledIcon>,
        task.name,
        task.roles ? mapArrayToList(task.roles) : "-",
        task.due_date ?
           <DateInPast isDateInPast={ isDateInPast(new Date(task.due_date)) } >{ displayDate(task.due_date) } </DateInPast> :
          "-",
        action.target ?
        <ButtonLink to={ to(`/zaken/:id/${ action.target }`, { id: caseId })}>
          <Button variant="primary" as="span">{ action.name }</Button>
        </ButtonLink> :
        <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={task.name} />
      ]
    })
  }, [ caseId, execPost ])

  const mappedTaskData = useMemo(() => tasks?.map(mapTaskData), [ mapTaskData, tasks ])

  return (
    mappedTaskData === undefined ?
      <Spinner /> :
      <WorkflowStatus status="" data={mappedTaskData} />
  )
}

export default Workflow