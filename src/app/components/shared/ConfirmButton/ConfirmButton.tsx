import { Button } from '@amsterdam/asc-ui';

import { useModal } from '../Modal/hooks/useModal';
import ConfirmModal, { Props as ConfirmModalProps } from '../Modal/ConfirmModal';

type Props =
  Omit<React.ComponentProps<typeof Button>, 'onClick'> &
  {
    modalTitle: ConfirmModalProps['title']
    modalContent: React.ReactNode
    onConfirm: ConfirmModalProps['onConfirm']
  }

/**
 * Button that opens a modal onClick
 */
const ConfirmButton: React.FC<Props> = ({
  modalTitle, onConfirm, modalContent, children, ...restProps
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Button onClick={openModal} {...restProps}>
        { children }
      </Button>
      <ConfirmModal title={modalTitle} isOpen={isModalOpen} onClose={closeModal} onConfirm={onConfirm}>
        { modalContent }
      </ConfirmModal>
    </>
  );
};

export default ConfirmButton;
