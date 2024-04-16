import { useState, useEffect } from "react"
import styled from "styled-components"
import { Spinner, Checkbox, Label } from "@amsterdam/asc-ui"
import { useTask, useUsersMe } from "app/state/rest"
import useContextCache from "app/state/rest/provider/useContextCache"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"
import UserIcon from "./UserInitials"


type Props = {
  task: Components.Schemas.CaseUserTaskWorkdflow
}

const StyledSpinner = styled(Spinner)`
  margin: 2px 0px;
`

const StyledLabel = styled(Label)`
  font-weight: 400;
  height: 24px; // Hacky solution to prevent the row from shifting in height every time it loads or is't getting checked.
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: -8px;
`

const SelectTask: React.FC<Props> = ({ task }) => {
  const { case_user_task_id: taskId, owner: taskOwner, case: caseId } = task
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [me, { isBusy }] = useUsersMe()
  const [, { execPatch }] = useTask(taskId)
  const apiUrl = makeApiUrl("cases", caseId)
  const { getContextItem, updateContextItem } = useContextCache("cases", apiUrl)

  useEffect(() => {
    // Check if userId is matching with the taskOwner.
    const isSelected = me?.id === taskOwner
    setIsChecked(isSelected)
  }, [me?.id, taskOwner])

  const onChange = () => {
    setLoading((prevLoading) => !prevLoading)
    const owner = isChecked ? null : me?.id

    execPatch({ owner })
      .then((resp: any) => {
        if (resp.status === 200) {
          // Owner is siuccesfully changed so update context tp prevent a hard page reload for just a checkbox.
          const caseItem = getContextItem()
          // Find the index of the workflow containing the task to be updated
          const workflowIndex = caseItem.workflows.findIndex((workflow: any) =>
              workflow.tasks.some((task: any) => task.case_user_task_id === taskId)
          )
          // If the workflow containing the task is found
          if (workflowIndex !== -1) {
              // Find the index of the task within the workflow
              const taskIndex = caseItem.workflows[workflowIndex].tasks.findIndex((task: any) =>
                  task.case_user_task_id === taskId
              )
              // If the task is found within the workflow
              if (taskIndex !== -1) {
                  // Make a deep copy of the original case object (Optional: to maintain immutability)
                  const updatedCase = structuredClone(caseItem)
                  // Update the task as needed
                  updatedCase.workflows[workflowIndex].tasks[taskIndex].owner = resp.data.owner
                  // Update context of the case
                  updateContextItem(updatedCase)
              } else {
                  console.error("Task not found within the workflow.")
              }
          } else {
              console.error("Workflow containing the task not found.")
          }
        }
      })
      .finally(() => setLoading((prevLoading) => !prevLoading))
  }

  if (isBusy || loading) {
    return <StyledSpinner />
  }
  // If taskOwner is known but the the taskOwner is not the active user, show a user icon.
  if (taskOwner && taskOwner !==  me?.id ) {
    return <UserIcon owner={ taskOwner }/>
  }
  return (
    <StyledLabel htmlFor={ `cb_${ taskId }` } label={ me && me?.id === taskOwner ? `${ createNameAbbreviation(me) }` : "" }>
      <CustomTooltip title={ isChecked ? "Mijn taak" : "Beschikbaar" }>
        <StyledCheckbox data-testid={ `${ taskId }` } id={ `cb_${ taskId }` } checked={ isChecked } onChange={ onChange }/>
      </CustomTooltip>
    </StyledLabel>
  )
}

export default SelectTask
