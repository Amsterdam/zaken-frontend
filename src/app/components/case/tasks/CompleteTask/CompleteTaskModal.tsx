import React from "react"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CompleteTaskForm from "./CompleteTaskForm"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export type Props = {
  taskName: string
  caseId: number
  isOpen: boolean
  closeModal: () => void
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
}

const CompleteTaskModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, taskName, caseId }) => {
  const title = `Is de taak "${ taskName }" afgerond?`
  const { clearFlashMessages, addSuccessFlashMessage } = useFlashMessages()

  const onSubmitWrap = async () => {
    const result = await onSubmit( {} )
    if (result === undefined) return
    const path = `/zaken/${ caseId }`
    clearFlashMessages(path)
    addSuccessFlashMessage(path, "Succes", `De taak "${ taskName }" is succesvol afgerond`)
  }
  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <ModalBlock>
        <CompleteTaskForm onSubmit={ onSubmitWrap } onCancel={closeModal} />
      </ModalBlock>
    </Modal>
  )
}


export default CompleteTaskModal
