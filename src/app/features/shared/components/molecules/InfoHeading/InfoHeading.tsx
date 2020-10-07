import React from "react"
import { Heading } from "@datapunt/asc-ui"
import InfoButton from "./InfoButton"
import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"

type Props = {
  children: string | JSX.Element
  infoTitle: string
  infoText: string
}

const InfoHeading: React.FC<Props> = ({ children, infoTitle, infoText }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <Heading>
      { children }
      <InfoButton onClick={ () => openModal() } />
      <Modal title={ infoTitle } isOpen={ isModalOpen } onClose={ closeModal }>
        <ModalBlock>
          { infoText }
        </ModalBlock>
      </Modal>
    </Heading>
  )
}
export default InfoHeading
