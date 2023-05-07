import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeTagForm from "./ChangeTagForm"

export type Props = {
  isOpen: boolean
  closeModal: () => void
  case: Components.Schemas.CaseCreate
}

const ChangeTagModal: React.FC<Props> = ({ isOpen, closeModal, case: caseItem }) => (
  <Modal
    isOpen={ isOpen }
    onClose={ closeModal }
    title="Wijzig tag"
  >
    <ModalBlock>
      <ChangeTagForm onCancel={ closeModal } case={ caseItem } />
    </ModalBlock>
  </Modal>
)

export default ChangeTagModal
