

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeSubjectForm from "./ChangeSubjectForm"

export type Props = {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: any) => void
  subjects?: Components.Schemas.Subject[]
  taskId: string
  
}

const ChangeSubjectModal: React.FC<Props> = ({ isOpen, closeModal, onSubmit, subjects }) =>
  <Modal
    isOpen={isOpen}
    onClose={closeModal}
    title="Overtreding onderwerp aanpassen"
  >
    <ModalBlock>
      <ChangeSubjectForm onSubmit={ onSubmit } onCancel={closeModal} subjects={subjects} initialValues={{ subjects: subjects }} />
      {/* { subjects.join(", ") } */}
    </ModalBlock>
  </Modal>

export default ChangeSubjectModal
