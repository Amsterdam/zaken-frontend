import React from "react"
import styled from "styled-components"
import { Modal as AscModal, TopBar, Heading, Button, Icon, Divider, themeSpacing } from "@amsterdam/asc-ui"
import { Close } from "@material-ui/icons"

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

const Modal: React.FC<Props> = ({ children, title, isOpen, onClose }) => (
  <AscModal open={isOpen} onClose={onClose}>
    <TopBar>
      <Heading forwardedAs="h4" style={{ flexGrow: 1 }}>
        { title }
        <Button
          type="button"
          size={30}
          onClick={onClose}
          variant="blank"
        >
          <Icon size={28}><Close /></Icon>
        </Button>
      </Heading>
    </TopBar>
    <Divider />
    { children }
  </AscModal>)

export default Modal
