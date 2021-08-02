import { useModal } from "app/components/shared/Modal/hooks/useModal"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import CamundaFormModal from "./CamundaFormModal"

type Props = {
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  taskName: string
  caseId: Components.Schemas.Case["id"]
  form: Components.Schemas.CamundaTask["form"]
  disabled: boolean
}

const CamundaFormButton: React.FC<Props> = ({ onSubmit, taskName, caseId, form, disabled }) => {

  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <TableAction onClick={ openModal } disabled={ disabled }>Uitkomst</TableAction>
      <CamundaFormModal
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

export default CamundaFormButton
