import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { useDueDate } from "app/state/rest/case"
import { Edit } from "app/components/shared/Icons"
import { appendTimeToDate } from "app/components/shared/Helpers/helpers"
import DueDate from "app/components/shared/DueDate/DueDate"
import ChangeDueDateModal from "./ChangeDueDateModal"

type Props = {
  caseId: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
  dueDate: Components.Schemas.CamundaTask["due_date"]
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

const mapSubmitData = (data: Components.Schemas.CamundaDateUpdate) => ({
  ...data,
  date: appendTimeToDate(data.date)
})

const ChangeableDueDate: React.FC<Props> = ({ dueDate, camundaTaskId }) => {

  const { isModalOpen, openModal, closeModal } = useModal()

  const [, { execPost }] = useDueDate({ lazy: true })
  const onSubmit = (data: Components.Schemas.CamundaDateUpdate) => execPost(mapSubmitData(data))

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
        taskId={ camundaTaskId }
        />
    </>
  )
}

export default ChangeableDueDate
