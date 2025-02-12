
import styled from "styled-components"
import { Button, Paragraph } from "@amsterdam/asc-ui"

import Modal, { ModalBlock } from "./Modal"
import { SpinnerButton } from "app/components/shared/loading"

export type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<any>
  okValue?: string
  cancelValue?: string
}

const ModalBlockFlex = styled(ModalBlock)`
  display: flex
`

const Flex = styled.div`
  flex: 1;
`

const ConfirmModal: React.FC<Props> = ({ isOpen, onClose, title, children, okValue = "Ok", cancelValue = "Annuleren", onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <ModalBlock>
      <Paragraph>{ children }</Paragraph>
    </ModalBlock>
    <ModalBlockFlex>
      <Flex>
        <Button variant="tertiary" onClick={onClose}>{ cancelValue }</Button>
      </Flex>
      <div>
        <SpinnerButton
          data-testid="confirm"
          onClick={onConfirm}
          variant="secondary"
        >
          { okValue }
        </SpinnerButton>
      </div>
    </ModalBlockFlex>
  </Modal>
)

export default ConfirmModal
