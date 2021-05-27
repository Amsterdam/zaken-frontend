import styled from "styled-components"
import { breakpoint, Icon, MenuButton } from "@amsterdam/asc-ui"
import { PermIdentity, Logout } from "app/components/shared/Icons"

type Props = {
  name?: string
  onClick: () => void
}

const Div = styled.div`
  padding: 12px 0 0 16px;
  vertical-align: middle;
  height: 54px;

  span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }

  svg {
    display: inline-block;
    transform: translateY(-2px);
  }

  svg[aria-hidden='true'] {
    display: inline-block !important;
  }

  @media screen and ${ breakpoint("min-width", "laptopM") } {
    display: inline-block;
    padding: 8px 0 0 24px;
  }
`

const StyledMenuButton = styled(MenuButton)`
  height: 54px;
  font-weight: normal;
  padding: 12px 16px 9px;
`

const UserDisplay: React.FC<Props> = ({ name, onClick }) =>
  <>
    { name &&
      <Div>
        <Icon size={ 32 }><PermIdentity /></Icon>
        <span>{ name }</span>
      </Div>
    }
    <StyledMenuButton
      tabIndex={ 0 }
      onClick={ onClick }
      iconLeft={ <Logout/> }
      title="Uitloggen"
      iconSize={ 24 }
    >Uitloggen</StyledMenuButton>
  </>
export default UserDisplay
