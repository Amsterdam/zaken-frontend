import React from "react"

import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import CompleteTaskForm from "./CompleteTaskForm"


export type Props = {
  taskName: string
  isOpen: boolean
  closeModal: () => void
  onSubmit: any
}

const CompleteTaskModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName }) => (
  <Modal isOpen={isOpen} onClose={closeModal} title={taskName}>
    <ModalBlock>
        <CompleteTaskForm onSubmit={ onSubmit } />
    </ModalBlock>
  </Modal>
)

export default CompleteTaskModal
