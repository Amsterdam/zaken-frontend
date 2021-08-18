import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CompleteTaskForm from "../CompleteTask/CompleteTaskForm"
import CamundaForm from "../CamundaTask/CamundaForm"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export type Props = {
  taskName: string
  caseId: number
  isOpen: boolean
  closeModal: () => void
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  form?: Components.Schemas.CamundaTask["form"]
}

const FormModal: React.FC<Props> = ({ form, isOpen, closeModal, onSubmit, taskName, caseId }) => {

  const title = form ? `Rond de taak "${ taskName }" af` : `Is de taak "${ taskName }" afgerond?`

  const { addSuccessFlashMessage } = useFlashMessages()

  const onSubmitWrap = async (variables: Components.Schemas.CamundaTaskComplete["variables"] = {}) => {
    const result = await onSubmit(variables)
    if (result === undefined) return
    const path = `/zaken/${ caseId }`
    addSuccessFlashMessage(path, "Succes", `De taak "${ taskName }" is succesvol afgerond`, true)
  }

  return (
    <Modal isOpen={ isOpen } onClose={ closeModal } title={ title }>
      <ModalBlock>
        { form ?
          <CamundaForm onSubmit={ onSubmitWrap } onCancel={ closeModal } camundaForm={ form } /> :
          <CompleteTaskForm onSubmit={ onSubmitWrap } onCancel={ closeModal } />
        }
      </ModalBlock>
    </Modal>
  )
}

export default FormModal