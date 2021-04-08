import { FC } from "react"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeDueDateForm from "./ChangeDueDateForm"

export type Props = {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: any) => void
  dueDate: string
  taskId: string
}

const ChangeDueDateModal: FC<Props> = ({ isOpen, closeModal, onSubmit, dueDate, taskId }) =>
  <Modal
    isOpen={isOpen}
    onClose={closeModal}
    title="Wat is de nieuwe datum?"
  >
    <ModalBlock>
      <ChangeDueDateForm onSubmit={ onSubmit } onCancel={closeModal} dueDate={dueDate} taskId={taskId} />
    </ModalBlock>
  </Modal>

export default ChangeDueDateModal
