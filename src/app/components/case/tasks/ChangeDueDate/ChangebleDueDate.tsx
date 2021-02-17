import React from "react"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { isDateInPast } from "app/components/shared/Date/helpers"
import styled from "styled-components"
import { useDueDate } from "app/state/rest/case"


type Props = {
  caseId: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
  dueDate: string
}


type DateProps = {
    isDateInPast: boolean
  }
  
const DateInPast = styled.span<DateProps>`
  font-weight: 400;
  cursor: pointer;
  color: ${ props => props.isDateInPast ? "red" : "black" };
  &:hover {
    text-decoration: underline;
  }
  `

const ChangeableDueDate: React.FC<Props> = ({ dueDate, camundaTaskId, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  const { execPost } = useDueDate({ lazy: true })
  const onSubmit = (data: any) => {
    console.log(data, camundaTaskId, caseId)
    execPost()
  }

  return (
    <>
      <DateInPast 
        isDateInPast={ isDateInPast(new Date(dueDate)) } 
        role="link" 
        onClick={openModal}
      >
        { displayDate(dueDate) }
      </DateInPast>
      <ChangeDueDateModal onSubmit={onSubmit} isOpen={isModalOpen} closeModal={closeModal} dueDate={dueDate}  />
    </>
  )
}

export default ChangeableDueDate
