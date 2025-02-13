import styled from "styled-components"
import { Button } from "@amsterdam/asc-ui"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import CustomIcon from "../CustomIcon/CustomIcon"

type Props = {
  infoTitle: string
  infoText: React.ReactNode
  onClick?: React.ComponentProps<typeof Button>["onClick"]
}

const ButtonWrap = styled.span`
  span {
    padding: 0;
    height: 20px;
    border-radius: 10px;
  }
`

const InfoButton: React.FC<Props> = ({ infoTitle, infoText }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <>
      <ButtonWrap>
        <Button
          as="span"
          variant="blank"
          onClick={ openModal }
          icon={ <CustomIcon name="Info" /> }
        />
      </ButtonWrap>
      <Modal title={ infoTitle } isOpen={ isModalOpen } onClose={ closeModal }>
        <ModalBlock>
          { infoText }
        </ModalBlock>
      </Modal>
    </>
  )
}
export default InfoButton
