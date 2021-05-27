
import styled from "styled-components"
import { Modal as AscModal, TopBar, Heading, Button, Icon, Divider, themeSpacing } from "@amsterdam/asc-ui"
import { Close } from "app/components/shared/Icons"

type Props = {
  title: string
  isOpen: boolean
  showCloseButton?: boolean
  onClose: () => void
}

export const ModalBlock = styled.div`
  display: block;
  padding: 0 ${ themeSpacing(4) };
  margin: ${ themeSpacing(4) } 0;
  line-height: 1.5;
`

const Modal: React.FC<Props> = ({ children, title, isOpen, showCloseButton = true, onClose }) => (
  <AscModal open={isOpen} onClose={onClose}>
    <TopBar>
      <Heading forwardedAs="h4" style={{ flexGrow: 1, padding: "12px 0" } }>
        { title }
        { showCloseButton &&
          <Button
            type="button"
            size={30}
            onClick={onClose}
            variant="blank"
            style={{ alignSelf: "flex-start" }}
          >
            <Icon size={28}><Close /></Icon>
          </Button>
        }
      </Heading>
    </TopBar>
    <Divider />
    { children }
  </AscModal>)

export default Modal
