import React, { ComponentProps, FC } from "react"
import { Button, Icon } from "@amsterdam/asc-ui"
import { Info } from "app/features/shared/components/atoms/Icons"

import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"

type Props = {
  infoTitle: string
  infoText: React.ReactNode
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
