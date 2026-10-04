import { Button } from "@amsterdam/design-system-react"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import FormModal from "../FormModal/FormModal"

type Props = {
  onSubmit: (
    variables: Tasks.WorkflowTask["form_variables"],
  ) => Promise<unknown>
  taskName: string
  caseId: components["schemas"]["CaseDetail"]["id"]
  form?: Tasks.WorkflowTask["form"]
  disabled?: boolean
}

export const NO_PERMISSION = "U heeft geen rechten om deze actie uit te voeren"

/** Completes a task: opens the form that belongs to it. */
const TaskButton: React.FC<Props> = ({
  onSubmit,
  taskName,
  caseId,
  form,
  disabled = false,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button
        variant="secondary"
        disabled={disabled}
        title={disabled ? NO_PERMISSION : undefined}
        aria-label={`Taak afronden: ${taskName}`}
        onClick={openModal}
      >
        Taak afronden
      </Button>
      <FormModal
        taskName={taskName}
        caseId={caseId}
        onSubmit={onSubmit}
        isOpen={isModalOpen}
        closeModal={closeModal}
        form={form}
      />
    </>
  )
}

export default TaskButton
