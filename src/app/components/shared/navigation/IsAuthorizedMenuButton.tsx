import { MenuButton } from "@amsterdam/asc-ui"
import styled from "styled-components"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import StyledButtonLink from "./StyledButtonLink"

type Props = React.ComponentProps<typeof MenuButton> & {
  permissionName: Components.Schemas.PermissionsEnum
  to: string
  text: string | undefined
}

const StyledMenuButton = styled(MenuButton)`
  background: none !important;
  margin-left: 8px;
  span {
    color: #B4B4B4 !important;
    border-bottom: none !important;
  }
`

const IsAuthorizedMenuButton: React.FC<Props> = ({ permissionName, to, text, ...restProps }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionName)
  const isAuthorized = !isBusy && hasPermission
  return isAuthorized ?
    <StyledButtonLink to={ to }>
      <MenuButton { ...restProps }>{ text }</MenuButton>
    </StyledButtonLink> :
    <StyledMenuButton disabled={ true } { ...restProps } title="U heeft geen permissie tot deze actie">{ text }</StyledMenuButton>
}

export default IsAuthorizedMenuButton