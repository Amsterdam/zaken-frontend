import React, { useCallback, useMemo } from "react"
import { Button, Icon, Spinner, themeSpacing } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
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

const Workflow: React.FC<Props> = ({ caseId }) => {

  const { data } = useCaseTasks(caseId)
  const { execPost } = useTaskComplete({ lazy: true })

  const mapTaskData = useCallback((data: Components.Schemas.CamundaTask) => {
    const action = taskActionMap[data.task_name_id] ?? {}

    const onSubmitTaskComplete = () => (
      execPost({ case: caseId, camunda_task_id: data.camunda_task_id, variables: {} })
    )

    return ({
      itemList: [
        <StyledIcon size={32}>{ <LockOpen /> }</StyledIcon>,
        data.name,
        data.roles ? mapArrayToList(data.roles) : "-",
        data.due_date ?
           <DateInPast isDateInPast={ isDateInPast(new Date(data.due_date)) } >{ displayDate(data.due_date) } </DateInPast> :
          "-",
        action.target ?
        <ButtonLink to={ to(`/zaken/:id/${ action.target }`, { id: caseId })}>
          <Button variant="primary" as="span">{ action.name }</Button>
        </ButtonLink> :
        <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={data.name} />
      ]
    })
  }, [ caseId, execPost ])

  const mappedTaskData = useMemo(() => data?.map(mapTaskData), [ mapTaskData, data ])

  return (
    mappedTaskData === undefined ?
      <Spinner /> :
      <WorkflowStatus status="" data={mappedTaskData} />
  )
}

export default Workflow