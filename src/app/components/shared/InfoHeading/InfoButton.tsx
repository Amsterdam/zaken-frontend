import { Button, Icon } from "@amsterdam/asc-ui"
import { Info } from "app/components/shared/Icons"

import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { useModal } from "app/components/shared/Modal/hooks/useModal"

type Props = {
  infoTitle: string
  infoText: React.ReactNode
  onClick?: React.ComponentProps<typeof Button>["onClick"]
}

const InfoButton: React.FC<Props> = ({ infoTitle, infoText }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <>
      <Button
        as="span"
        variant="blank"
        onClick={ openModal }
        icon={ <Icon><Info /></Icon> }
      />
      <Modal title={ infoTitle } isOpen={ isModalOpen } onClose={ closeModal }>
        <ModalBlock>
          { infoText }
        </ModalBlock>
      </Modal>
    </>
  )
}
export default InfoButton
