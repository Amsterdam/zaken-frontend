import { useState } from "react"
import { Button, Column, Heading, Row } from "@amsterdam/design-system-react"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import TaskDialog from "../forms/TaskForm/TaskDialog"
import Workflow from "../Workflow/Workflow"
import styles from "./CaseStatus.module.css"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

/** The open tasks of a case, and the button to add one. */
const CaseStatus: React.FC<Props> = ({ id }) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  return (
    <Column gap="small">
      <Row
        align="between"
        alignVertical="center"
        wrap
        className={styles.header}
      >
        <Heading level={2}>Open taken</Heading>
        <Button
          variant="secondary"
          disabled={!hasPermission}
          title={
            hasPermission ? undefined : "U heeft geen permissie tot deze actie"
          }
          onClick={() => setIsTaskDialogOpen(true)}
          data-testid="btn_add_extra_task"
        >
          Taak opvoeren
        </Button>
      </Row>
      <Workflow id={id} />
      {isTaskDialogOpen && (
        <TaskDialog id={id} onClose={() => setIsTaskDialogOpen(false)} />
      )}
    </Column>
  )
}

export default CaseStatus
