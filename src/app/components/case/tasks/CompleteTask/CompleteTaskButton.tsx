
import { Button } from "@amsterdam/asc-ui"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import CompleteTaskModal from "./CompleteTaskModal"

type Props = {
  onSubmit: (variables: Components.Schemas.CamundaTaskComplete["variables"]) => Promise<unknown>
  taskName: string
  caseId: number
}

const CompleteTaskButton: React.FC<Props> = ({ onSubmit, taskName, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return <>
    <Button variant="primary" onClick={openModal} >Taak afronden</Button>
    <CompleteTaskModal taskName={taskName} caseId={caseId} onSubmit={onSubmit} isOpen={isModalOpen} closeModal={closeModal} />
  </>
}

export default CompleteTaskButton
