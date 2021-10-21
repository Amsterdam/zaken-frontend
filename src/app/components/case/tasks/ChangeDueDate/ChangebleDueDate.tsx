import { useState, useEffect } from "react"
import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { Edit } from "app/components/shared/Icons"
import { appendTimeToDate } from "app/components/shared/Helpers/helpers"
import DueDate from "app/components/shared/DueDate/DueDate"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { useTask } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTask["task_id"]
  dueDate: Components.Schemas.CaseUserTask["due_date"]
}

const Span = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: ${ themeSpacing(5) };
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin-left: ${ themeSpacing(2) };
`

// const mapSubmitData = (data: Components.Schemas.CamundaDateUpdate) => ({
//   ...data,
//   date: appendTimeToDate(data.date)
// })

const ChangeableDueDate: React.FC<Props> = ({ dueDate, caseId, caseUserTaskId }) => {

  const [isNewDate, setIsNewDate] = useState("")
  const { isModalOpen, openModal, closeModal } = useModal()

  const [, { execPatch }] = useTask(caseUserTaskId)

  useEffect(() => {
    setIsNewDate (dueDate)
  }, [dueDate])

  const onSubmit = (data: any) => {
    console.log("date", data.date)
    execPatch( { due_date: isNewDate !== data.date ? appendTimeToDate(data.date) : undefined })
    .then((resp: any) => {
      console.log("resp", resp)
      setIsNewDate(resp.data.due_date)
    })
  }

  return (
    <>
      <Span
        role="link"
        onClick={ openModal }
        >
        <DueDate date={ dueDate } />
        <StyledIcon size={ 20 }><Edit titleAccess="Pas de slotdatum aan" /></StyledIcon>
      </Span>
      <ChangeDueDateModal
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        dueDate={ dueDate }
        taskId={ caseUserTaskId }
        />
    </>
  )
}

export default ChangeableDueDate
