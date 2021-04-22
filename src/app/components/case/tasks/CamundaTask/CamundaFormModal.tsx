

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CamundaForm from "./CamundaForm"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export type Props = {
  taskName: string
  caseId: number
  form: Components.Schemas.CamundaTask["form"]
  isOpen: boolean
  closeModal: () => void
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
}

const CamundaFormModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName, caseId, form }) => {
  const title = `Is de taak "${ taskName }" afgerond?`
  const { addSuccessFlashMessage } = useFlashMessages()

  const onSubmitWrap = async ( variables: Components.Schemas.CamundaTaskComplete["variables"]) => {
    const result = await onSubmit( variables )
    if (result === undefined) return
    const path = `/zaken/${ caseId }`
    addSuccessFlashMessage(path, "Succes", `De taak "${ taskName }" is succesvol afgerond`, true)
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <ModalBlock>
        <CamundaForm onSubmit={ onSubmitWrap } onCancel={closeModal} camundaForm={ form } />
      </ModalBlock>
    </Modal>
  )
}


export default CamundaFormModal
