import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import CompleteTaskForm from "../CompleteTask/CompleteTaskForm"
import WorkflowForm from "../WorkflowTask/WorkflowForm"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

export type Props = {
  taskName: string
  caseId: number
  isOpen: boolean
  closeModal: () => void
  onSubmit: (variables: Components.Schemas.GenericCompletedTask["variables"]) => Promise<unknown>
  form?: Components.Schemas.CaseUserTask["form"]
}

const FormModal: React.FC<Props> = ({ form, isOpen, closeModal, onSubmit, taskName, caseId }) => {

  const title = form ? `Rond de taak "${ taskName }" af` : `Is de taak "${ taskName }" afgerond?`

  const { addSuccessFlashMessage } = useFlashMessages()

  const onSubmitWrap = async (variables: Components.Schemas.GenericCompletedTask["variables"] = {}) => {
    const requestBody = form ? variables : {}
    const result = await onSubmit(requestBody)
    if (result === undefined) return
    const path = `/zaken/${ caseId }`
    addSuccessFlashMessage(path, "Succes", `De taak "${ taskName }" is succesvol afgerond`, true)
  }

  return (
    <Modal isOpen={ isOpen } onClose={ closeModal } title={ title }>
      <ModalBlock>
        { form && form.length > 0 ?
          <WorkflowForm onSubmit={ onSubmitWrap } onCancel={ closeModal } workflowForm={ form } /> :
          <CompleteTaskForm onSubmit={ onSubmitWrap } onCancel={ closeModal } />
        }
      </ModalBlock>
    </Modal>
  )
}

export default FormModal