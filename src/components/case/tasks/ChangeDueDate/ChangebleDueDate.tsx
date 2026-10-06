import { useState } from "react"
import { IconButton, Row } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import { formatDate } from "@/shared/dateFormatters"
import isDateInPast from "@/shared/isDateInPast"
import styles from "../../Workflow/Workflow.module.css"
import ChangeDueDateDialog from "./ChangeDueDateDialog"

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
  const [isOpen, setIsOpen] = useState(false)
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

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
          onClick={() => setIsOpen(true)}
        />
      </Row>
      {isOpen && (
        <ChangeDueDateDialog
          caseId={caseId}
          caseUserTaskId={caseUserTaskId}
          dueDate={dueDate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default ChangeableDueDate
