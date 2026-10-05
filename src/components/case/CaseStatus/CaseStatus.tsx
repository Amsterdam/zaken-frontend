import { useState } from "react"
import { Button } from "@amsterdam/design-system-react"
import { ClipboardIcon } from "@amsterdam/design-system-react-icons"
import { Card } from "@/components/Card/Card"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import TaskDialog from "../forms/TaskForm/TaskDialog"
import Workflow from "../Workflow/Workflow"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

/** The open tasks of a case, and the button to add one. */
const CaseStatus: React.FC<Props> = ({ id }) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  return (
    <Card
      title="Open taken"
      icon={ClipboardIcon}
      headingLevel={2}
      actions={
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
      }
    >
      <Workflow id={id} />
      {isTaskDialogOpen && (
        <TaskDialog id={id} onClose={() => setIsTaskDialogOpen(false)} />
      )}
    </Card>
  )
}

export default CaseStatus
