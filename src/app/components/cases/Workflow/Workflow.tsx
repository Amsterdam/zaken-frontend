import React, { useMemo } from "react"
import { Button, Icon, Spinner, themeSpacing, ErrorMessage } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import LockOpen from "@material-ui/icons/LockOpen"
import CompleteTaskButton from "app/components/case/tasks/CompleteTask/CompleteTaskButton"
import styled from "styled-components"
import { capitalizeString } from "app/components/shared/Helpers/helpers"
import ChangeableDueDate from "app/components/case/tasks/ChangeDueDate/ChangebleDueDate"
import StyledTable from "./components/StyledTable"
import CamundaFormButton from "app/components/case/tasks/CamundaTask/CamundaFormButton"

type Props = {
  id: Components.Schemas.Case["id"]
}

type TaskAction = {
  name: string
  target: string
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

const mapArrayToList = (list: any[]) =>
  <Ul>
    { list.map((item: any, index: number) =>
        <li key={ index }>{ capitalizeString(item) }</li>
    )}
  </Ul>

export const taskActionMap = {
  task_create_schedule: { name: "Huisbezoek inplannen", target: "inplanning" },
  task_create_visit: { name: "Resultaat huisbezoek", target: "huisbezoek" },
  task_create_debrief: { name: "Debrief verwerken", target: "debriefing" },
  task_create_summon: { name: "Aanschrijving verwerken", target: "aanschrijving" }
} as Record<string, TaskAction>

const mapTaskData =
  (id: Components.Schemas.Case["id"], execPost: (data: Partial<Components.Schemas.CamundaTaskComplete>) => Promise<unknown> ) =>
    (data: Components.Schemas.CamundaTask) => {

      const { task_name_id, camunda_task_id, name, roles, due_date, form } = data
      const action = taskActionMap[task_name_id]
      const onSubmitTaskComplete = (variables: Components.Schemas.CamundaTask["form"] = {}) => execPost({ case: id, camunda_task_id, variables })

      return ({
        itemList: [
          <StyledIcon size={32}>{ <LockOpen /> }</StyledIcon>,
          name,
          roles ? mapArrayToList(roles) : "-",
          due_date ?
          <ChangeableDueDate dueDate={data.due_date} caseId={id} camundaTaskId = {camunda_task_id} /> :
            "-",
          action !== undefined ?
            <ButtonLink to={ to(`/zaken/:id/${ action.target }`, { id: id }) }>
              <Button variant="primary" as="span">{ action.name }</Button>
            </ButtonLink> :
          form ?
            <CamundaFormButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } form={ form } /> :
            <CompleteTaskButton onSubmit={ onSubmitTaskComplete } taskName={ name } caseId={ id } />
        ]
      })
    }

const columns = [
  { minWidth: 50 },
  { header: "Actuele taken", minWidth: 100 },
  { header: "Uitvoerder", minWidth: 100 },
  { header: "Slotdatum", minWidth: 100 },
  { header: "Verwerking taak", minWidth: 140 }
]

const Workflow: React.FC<Props> = ({ id }) => {

  const [data, { isBusy, hasErrors }] = useCaseTasks(id)
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const mappedData = useMemo(() => data?.map(mapTaskData(id, execPost)), [data, id, execPost])

  const showSpinner = isBusy
  const hasData = mappedData !== undefined

  return (
    showSpinner ?
      <Spinner /> :
    hasData ?
      <StyledTable
        columns={ columns }
        data={ mappedData }
        noValuesPlaceholder={ <>Geen taken beschikbaar. <a href={ window.location.pathname }>Herlaad</a></> }
      /> :
    hasErrors ?
      <ErrorMessage message="Laden van taken mislukt" /> :
      null
  )
}

export default Workflow