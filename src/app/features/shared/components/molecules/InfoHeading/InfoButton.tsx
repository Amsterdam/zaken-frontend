import React, { ComponentProps, FC } from "react"
import { Button, Icon } from "@datapunt/asc-ui"
import { Info } from "@datapunt/asc-assets"

import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"

type Props = {
  infoTitle: string
  infoText: string | JSX.Element
  onClick?: ComponentProps<typeof Button>["onClick"]
}

const InfoButton: FC<Props> = ({ infoTitle, infoText }) => {
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
