import { useModal } from "app/components/shared/Modal/hooks/useModal"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import CompleteTaskModal from "./CompleteTaskModal"
import CamundaFormModal from "../CamundaTask/CamundaFormModal"

type Props = {
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  taskName: string
  caseId: Components.Schemas.Case["id"]
  form?: Components.Schemas.CamundaTask["form"]
  disabled?: boolean
}

const CompleteTaskButton: React.FC<Props> = ({ onSubmit, taskName, caseId, form, disabled = false }) => {

  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <TableAction onClick={ openModal } disabled={ disabled }>{ form !== undefined ? "Uitkomst" : "Taak afronden" }</TableAction>
      { form !== undefined ?
        <CamundaFormModal
          taskName={ taskName }
          caseId={ caseId }
          onSubmit={ onSubmit }
          isOpen={ isModalOpen }
          closeModal={ closeModal }
          form={ form! }
        /> :
        <CompleteTaskModal
          taskName={ taskName }
          caseId={ caseId }
          onSubmit={ onSubmit }
          isOpen={ isModalOpen }
          closeModal={ closeModal }
        />
      }
    </>
  )
}

export default CompleteTaskButton
