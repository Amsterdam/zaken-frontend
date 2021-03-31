import React from "react"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { displayDate } from "@amsterdam/wonen-ui"
import { isDateInPast } from "app/components/shared/Date/helpers"
import styled from "styled-components"
import { useDueDate } from "app/state/rest/case"
import { Icon, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { Edit } from "app/components/shared/Icons"
import { appendTimeToDate } from "app/components/shared/Helpers/helpers"


type Props = {
  caseId: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
  dueDate: string
}

type DateProps = {
  isDateInPast: boolean
}

const DateInPast = styled.span<DateProps>`
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

const mapSubmitData = (data: Components.Schemas.CamundaDateUpdate) => ({
  ...data,
  date: appendTimeToDate(data.date)
})

const ChangeableDueDate: React.FC<Props> = ({ dueDate, camundaTaskId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  const [, { execPost }] = useDueDate({ lazy: true })
  const onSubmit = (data: Components.Schemas.CamundaDateUpdate) => {
    execPost(mapSubmitData(data))
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
