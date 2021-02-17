import React from "react"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeDueDateForm from "./ChangeDueDateForm"

export type Props = {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: any) => void
  dueDate: string
}

const ChangeDueDateModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, dueDate }) => 
  <Modal 
    isOpen={isOpen} 
    onClose={closeModal} 
    title="Wat is de nieuwe datum?"
  >
    <ModalBlock>
      <ChangeDueDateForm onSubmit={ onSubmit } onCancel={closeModal} dueDate={dueDate} />
    </ModalBlock>
  </Modal>

export default ChangeDueDateModal
