import { IconButton, Row } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import { useUpdateTask } from "@/api/hooks"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import { formatDate } from "@/shared/dateFormatters"
import isDateInPast from "app/components/shared/Date/isDateInPast"
import { appendTimeToDate } from "app/components/shared/Helpers/helpers"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import styles from "../../Workflow/Workflow.module.css"
import ChangeDueDateModal from "./ChangeDueDateModal"

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
  dueDate: Tasks.WorkflowTask["due_date"]
}

/**
 * The due date of a task, red when it has passed; who may perform tasks can
 * change it with the button next to it.
 */
const ChangeableDueDate: React.FC<Props> = ({
  dueDate,
  caseId,
  caseUserTaskId,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const { mutate: updateTask } = useUpdateTask(caseUserTaskId, caseId)
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

  const onSubmit = (data: { date: string; id: string }) => {
    if (appendTimeToDate(data.date) !== dueDate) {
      updateTask(
        { due_date: appendTimeToDate(data.date) },
        { onSettled: closeModal },
      )
    } else {
      closeModal()
    }
  }

  const date = (
    <span
      className={isDateInPast(new Date(dueDate)) ? styles.overdue : undefined}
    >
      {formatDate(dueDate)}
    </span>
  )

  if (!hasPermission) return date

  return (
    <>
      <Row gap="small" alignVertical="center">
        {date}
        <IconButton
          label="Pas de slotdatum aan"
          svg={PencilIcon}
          onClick={openModal}
        />
      </Row>
      <ChangeDueDateModal
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        closeModal={closeModal}
        dueDate={dueDate}
        taskId={caseUserTaskId}
      />
    </>
  )
}

export default ChangeableDueDate
