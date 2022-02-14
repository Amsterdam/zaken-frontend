import { useModal } from "app/components/shared/Modal/hooks/useModal"
import TableAction from "app/components/shared/TableAction/TableAction"
import FormModal from "../FormModal/FormModal"

type Props = {
  onSubmit: (variables: Components.Schemas.GenericCompletedTask["variables"]) => Promise<unknown>
  taskName: string
  caseId: Components.Schemas.Case["id"]
  form?: Components.Schemas.CaseUserTaskWorkdflow["form"]
  disabled?: boolean
}

const TaskButton: React.FC<Props> = ({ onSubmit, taskName, caseId, form, disabled = false }) => {

  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <TableAction onClick={ openModal } disabled={ disabled }>Taak afronden</TableAction>
      <FormModal
        taskName={ taskName }
        caseId={ caseId }
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        form={ form }
      />
    </>
  )
}

export default TaskButton
