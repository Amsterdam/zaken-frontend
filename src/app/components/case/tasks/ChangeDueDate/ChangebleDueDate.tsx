import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { Edit } from "app/components/shared/Icons"
import { appendTimeToDate } from "app/components/shared/Helpers/helpers"
import DueDate from "app/components/shared/DueDate/DueDate"
import ChangeDueDateModal from "./ChangeDueDateModal"
import { useTaskUpdate } from "app/state/rest"
import useHasPermission, { CAN_PERFORM_TASK } from "app/state/rest/custom/usePermissions/useHasPermission"

type Props = {
  caseId: Components.Schemas.CaseDetail["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
  dueDate: Components.Schemas.CaseUserTaskWorkdflow["due_date"]
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

const ChangeableDueDate: React.FC<Props> = ({ dueDate, caseId, caseUserTaskId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [, { execPatch }] = useTaskUpdate(caseUserTaskId)
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

  const onSubmit = (data: { date: string, id: string }) => {
    appendTimeToDate(data.date) !== dueDate
      ? execPatch( { due_date: appendTimeToDate( data.date ) })
      : closeModal()
  }

  return hasPermission ? (
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
  ) : <DueDate date={ dueDate } />
}

export default ChangeableDueDate
