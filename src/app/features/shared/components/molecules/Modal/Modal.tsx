import React from "react"
import styled from "styled-components"
import { Modal, TopBar, Heading, Button, Icon, Divider, themeSpacing } from "@datapunt/asc-ui"
import { Close } from "@datapunt/asc-assets/lib"

type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
}

export const ModalBlock = styled.div`
  display: block;
  padding: 0 ${ themeSpacing(4) };
  margin: ${ themeSpacing(4) } 0;
`

const ConfirmModal: React.FC<Props> = ({ children, title, isOpen, onClose }) => (
  <Modal open={isOpen} onClose={onClose}>
    <TopBar>
      <Heading forwardedAs="h4" style={{ flexGrow: 1 }}>
        { title }
        <Button
          type="button"
          size={30}
          onClick={onClose}
          variant="blank"
        >
          <Icon size={20}>
            <Close />
          </Icon>
        </Button>
      </Heading>
    </TopBar>
    <Divider />
    { children }
  </Modal>)

export default ConfirmModal
