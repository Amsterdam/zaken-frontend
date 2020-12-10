import React from "react"
import styled from "styled-components"
import { Button, Paragraph } from "@amsterdam/asc-ui"

import Modal, { ModalBlock } from "./Modal"
import SpinnerButton from "app/features/shared/components/atoms/SpinnerButton/SpinnerButton"

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
          data-e2e-id="confirm"
          onClick={onConfirm}
          variant="secondary"
        >{ okValue }</SpinnerButton>
      </div>
    </ModalBlockFlex>
  </Modal>
)

export default ConfirmModal
