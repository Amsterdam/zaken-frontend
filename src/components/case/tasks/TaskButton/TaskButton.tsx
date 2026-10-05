import { useState } from "react"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"
import CompleteTaskDialog from "../CompleteTask/CompleteTaskDialog"

type Props = {
  /** Completes the task; rejects when that failed. */
  onSubmit: (
    variables: Tasks.WorkflowTask["form_variables"],
  ) => Promise<unknown>
  taskName: string
  form?: Tasks.WorkflowTask["form"]
  disabled?: boolean
}

export const NO_PERMISSION = "U heeft geen rechten om deze actie uit te voeren"

/** Completes a task: opens the dialog with the form that belongs to it. */
const TaskButton: React.FC<Props> = ({
  onSubmit,
  taskName,
  form,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StandaloneButton
        disabled={disabled}
        title={disabled ? NO_PERMISSION : undefined}
        aria-label={`Taak afronden: ${taskName}`}
        onClick={() => setIsOpen(true)}
      >
        Taak afronden
      </StandaloneButton>
      {isOpen && (
        <CompleteTaskDialog
          taskName={taskName}
          form={form}
          onSubmit={onSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default TaskButton
