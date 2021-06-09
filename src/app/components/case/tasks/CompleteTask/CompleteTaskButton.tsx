import { useModal } from "app/components/shared/Modal/hooks/useModal"
import TableButton from "app/components/shared/Table/components/TableAction/TableAction"
import CompleteTaskModal from "./CompleteTaskModal"

type Props = {
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  taskName: string
  caseId: number
}

const CompleteTaskButton: React.FC<Props> = ({ onSubmit, taskName, caseId }) => {

  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <TableButton onClick={ openModal }>Taak afronden</TableButton>
      <CompleteTaskModal
        taskName={ taskName }
        caseId={ caseId }
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
      />
    </>
  )
}

export default CompleteTaskButton
