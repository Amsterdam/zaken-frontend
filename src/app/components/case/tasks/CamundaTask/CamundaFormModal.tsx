import React from "react"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CamundaForm from "./CamundaForm"

export type Props = {
  taskName: string
  form: Components.Schemas.CamundaTask["form"]
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => Promise<unknown>
}

const CamundaFormModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName, form }) => {
  const title = `Is de taak "${ taskName }" afgerond?`

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <ModalBlock>
        <CamundaForm onSubmit={ onSubmit } onCancel={closeModal} camundaForm={ form } />
      </ModalBlock>
    </Modal>
  )
}


export default CamundaFormModal
