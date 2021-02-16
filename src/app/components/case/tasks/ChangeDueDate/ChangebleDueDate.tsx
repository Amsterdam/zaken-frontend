import React from "react"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { isDateInPast } from "app/components/shared/Date/helpers"
import styled from "styled-components"


type Props = {
  onSubmit: () => void // Promise<unknown>
  dueDate: string
}


type DateProps = {
    isDateInPast: boolean
  }
  
const DateInPast = styled.span<DateProps>`
  font-weight: 300;
  cursor: pointer;
  color: ${ props => props.isDateInPast ? "red" : "black" };
  &:hover {
    text-decoration: underline;
  }
  `

const ChangeableDueDate: React.FC<Props> = ({ onSubmit, dueDate }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

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
