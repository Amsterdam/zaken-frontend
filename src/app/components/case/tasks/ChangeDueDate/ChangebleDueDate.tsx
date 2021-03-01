import React from "react"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { isDateInPast } from "app/components/shared/Date/helpers"
import styled from "styled-components"
import { useDueDate } from "app/state/rest/case"
import { Icon, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Edit } from "app/components/shared/Icons"


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
  color: ${ props => props.isDateInPast ? themeColor("secondary") : themeColor("tint", "level0") };
  &:hover {
    text-decoration: underline;
  }
  `

  const StyledIcon = styled(Icon)`
    display: inline-block;
    margin-left: ${ themeSpacing(2) };
    transform: translateY(2px);
  `

const ChangeableDueDate: React.FC<Props> = ({ dueDate, camundaTaskId, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  const { execPost } = useDueDate({ lazy: true })
  const onSubmit = (data: any) => {
    if( data.date) { data.date += "T00:00:01Z" }
    console.log(data, camundaTaskId, caseId)
    
    execPost(data)
  }

  return (
    <>
      <DateInPast 
        isDateInPast={ isDateInPast(new Date(dueDate)) } 
        role="link" 
        onClick={openModal}
      >
        { displayDate(dueDate) }
        <StyledIcon size={20}>{ <Edit /> }</StyledIcon>
      </DateInPast>
      <ChangeDueDateModal onSubmit={onSubmit} isOpen={isModalOpen} closeModal={closeModal} dueDate={dueDate} taskId={camundaTaskId}  />
    </>
  )
}

export default ChangeableDueDate
