import { Button } from "@amsterdam/asc-ui";
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal";
import { useModal } from "app/components/shared/Modal/hooks/useModal";
import CustomIcon from "../CustomIcon/CustomIcon";
import styles from "./InfoButton.module.css";

type Props = {
  infoTitle: string
  infoText: React.ReactNode
  onClick?: React.ComponentProps<typeof Button>["onClick"]
}

const InfoButton: React.FC<Props> = ({ infoTitle, infoText }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <>
      <span className={ styles.buttonWrap }>
        <Button
          as="span"
          variant="blank"
          onClick={ openModal }
          icon={ <CustomIcon name="Info" /> }
        />
      </span>
      <Modal title={ infoTitle } isOpen={ isModalOpen } onClose={ closeModal }>
        <ModalBlock>
          { infoText }
        </ModalBlock>
      </Modal>
    </>
  );
};
export default InfoButton;
