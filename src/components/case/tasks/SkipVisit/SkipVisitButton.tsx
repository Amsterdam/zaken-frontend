import { useState } from "react"
import { StandaloneButton } from "@/components/StandaloneButton/StandaloneButton"
import { NO_PERMISSION } from "../TaskButton/TaskButton"
import SkipVisitDialog from "./SkipVisitDialog"

type Props = {
  /** Completes the task; rejects when that failed. */
  onSubmit: (
    variables: Tasks.WorkflowTask["form_variables"],
  ) => Promise<unknown>
  taskName: string
  reasonLabel: string
  disabled?: boolean
}

/** Skips a planned visit: opens the dialog that asks for the reason. */
const SkipVisitButton: React.FC<Props> = ({
  onSubmit,
  taskName,
  reasonLabel,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StandaloneButton
        disabled={disabled}
        title={disabled ? NO_PERMISSION : undefined}
        aria-label={`Bezoek overslaan: ${taskName}`}
        onClick={() => setIsOpen(true)}
      >
        Bezoek overslaan
      </StandaloneButton>
      {isOpen && (
        <SkipVisitDialog
          taskName={taskName}
          reasonLabel={reasonLabel}
          onSubmit={onSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default SkipVisitButton
