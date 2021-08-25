import { MenuButton } from "@amsterdam/asc-ui"
import styled from "styled-components"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import StyledButtonLink from "./StyledButtonLink"

type Props = React.ComponentProps<typeof MenuButton> & {
  permissionName: Components.Schemas.PermissionsEnum
  to: string
  title: string | undefined
}

const StyledMenuButton = styled(MenuButton)`
  background: none !important;
  margin-left: 8px;
  span {
    color: #B4B4B4 !important;
    border-bottom: none !important;
  }
`

const IsAuthorizedMenuButton: React.FC<Props> = ({ permissionName, to, title, ...restProps }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionName)
  const isAuthorized = !isBusy && hasPermission
  return isAuthorized ?
    <StyledButtonLink to={ to }>
      <MenuButton { ...restProps }>{ title }</MenuButton>
    </StyledButtonLink> :
    <StyledMenuButton disabled={ true } { ...restProps }>{ title }</StyledMenuButton>
}

export default IsAuthorizedMenuButton