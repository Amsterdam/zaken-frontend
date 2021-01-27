import React from "react"

import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import CompleteTaskForm from "./CompleteTaskForm"


export type Props = {
  taskName: string
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: Components.Schemas.CamundaTaskComplete) => Promise<unknown>
}

const CompleteTaskModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName }) => {
  const title = `Is de taak "${ taskName }" afgerond?`

    return (
      <Modal isOpen={isOpen} onClose={closeModal} title={title}>
        <ModalBlock>
            <CompleteTaskForm onSubmit={ onSubmit } onCancel={closeModal} />
        </ModalBlock>
    </Modal>      
    )
}
  

export default CompleteTaskModal
