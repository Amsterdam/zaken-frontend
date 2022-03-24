import Modal, { ModalBlock } from 'app/components/shared/Modal/Modal';
import OtherAddressesTable from './OtherAddressesTable';

export type Props = {
  bagId: Components.Schemas.Address['bag_id']
  isOpen: boolean
  closeModal: () => void
}

const OtherAddressesModal: React.FC<Props> = ({ isOpen, closeModal, bagId }) => (
  <Modal isOpen={isOpen} onClose={closeModal} title="Andere adressen">
    <ModalBlock>
      <OtherAddressesTable bagId={bagId} onAddressChosen={closeModal} />
    </ModalBlock>
  </Modal>
);

export default OtherAddressesModal;
