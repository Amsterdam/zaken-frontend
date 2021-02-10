import React, { useCallback, useMemo } from "react"
import { Button, Icon, themeSpacing } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import WorkflowStatus from "./WorkflowStatus"
import LockOpen from "@material-ui/icons/LockOpen"
import CompleteTaskButton from "app/components/case/tasks/CompleteTask/CompleteTaskButton"
import styled from "styled-components"
import { mapArrayToUl } from "../CaseTimeline/helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

type Props = {
  caseId: Components.Schemas.Case["id"]
}
type TaskAction = {
  name: string
  target: string
}

const StyledIcon = styled(Icon)`
  padding-top: ${ themeSpacing(2) };
`

export const taskActionMap = {
  task_create_visit: { name: "Resultaat huisbezoek", target: "huisbezoek" },
  task_create_debrief: { name: "Debrief verwerken", target: "debriefing" },
  task_create_summon: { name: "Aanschrijving verwerken", target: "aanschrijving" }
} as Record<string, TaskAction>

const Workflow: React.FC<Props> = ({ caseId }) => {
  const dataTasks = useCaseTasks(caseId).data
  const { execPost } = useTaskComplete({ lazy: true })

  const mapTaskData = useCallback((data: Components.Schemas.CamundaTask) => {
    const action = taskActionMap[data.task_name_id] ?? {}

    const onSubmitTaskComplete = () => (
      execPost({ camunda_task_id: data.camunda_task_id, variables: {} })
    )

  return ({
    itemList: [
      <StyledIcon size={32}>{ <LockOpen /> }</StyledIcon>,
      data.name,
      data.roles ? mapArrayToUl(data.roles) : "-",
      data.due_date ? `${ displayDate(data.due_date) }` : "-",
      action.target ?
      <ButtonLink to={ to(`/zaken/:id/${ action.target }`, { id: caseId })}>
        <Button variant="primary" as="span">{ action.name }</Button>
      </ButtonLink> :
      <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={data.name} />

    ]
  })
}, [ caseId, execPost ])

  const mappedTaskData = useMemo(() => dataTasks?.map(mapTaskData), [ mapTaskData, dataTasks ])

  return (
    <WorkflowStatus status="" data={mappedTaskData} />
  )
}

export default Workflow