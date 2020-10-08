import React from "react"
import { Heading } from "@datapunt/asc-ui"
import InfoButton from "./InfoButton"
import Modal, { ModalBlock } from "app/features/shared/components/molecules/Modal/Modal"
import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"

type Props = {
  infoTitle: string
  infoText: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: string | JSX.Element
}

const InfoHeading: React.FC<Props> = ({ infoTitle, infoText, as = "h2", children }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <Heading as={ as }>
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
