import React from "react"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CompleteTaskForm from "./CompleteTaskForm"

export type Props = {
  taskName: string
  isOpen: boolean
  closeModal: () => void
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
}

const CompleteTaskModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName }) => {
  const title = `Is de taak "${ taskName }" afgerond?`
  const onSubmitWrap = async () => await onSubmit( {} )

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <ModalBlock>
        <CompleteTaskForm onSubmit={ onSubmitWrap } onCancel={closeModal} />
      </ModalBlock>
    </Modal>
  )
}


export default CompleteTaskModal
