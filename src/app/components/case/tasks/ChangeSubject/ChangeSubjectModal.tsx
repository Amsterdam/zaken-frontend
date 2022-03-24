import Modal, { ModalBlock } from 'app/components/shared/Modal/Modal';
import ChangeSubjectForm from './ChangeSubjectForm';

export type Props = {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: any) => void
  subjects: Components.Schemas.Subject[]
  themeId: Components.Schemas.CaseTheme['id']
}

const ChangeSubjectModal: React.FC<Props> = ({
  isOpen, closeModal, onSubmit, subjects = [], themeId,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={closeModal}
    title="Overtreding onderwerp aanpassen"
  >
    <ModalBlock>
      <ChangeSubjectForm
        onSubmit={onSubmit}
        onCancel={closeModal}
        themeId={themeId}
        subjects={subjects}
        initialValues={{ subjects }}
      />
    </ModalBlock>
  </Modal>
);

export default ChangeSubjectModal;
