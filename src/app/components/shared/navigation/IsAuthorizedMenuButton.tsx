import { MenuButton, Link } from "@amsterdam/asc-ui"
import styled from "styled-components"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import StyledButtonLink from "./StyledButtonLink"

type Props = React.ComponentProps<typeof MenuButton> & {
  permissionNames: Components.Schemas.PermissionsEnum[]
  isHidden?: boolean
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

const StyledLink = styled(Link)`
  position: relative;
  line-height: 22px;
  padding-left: 7px;
  border-left: 8px solid transparent;
  background-color: transparent;
  height: 100%;
  color: #000000;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  white-space: normal;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 16px;
  -webkit-transition: color 0.1s ease-in-out,background-color 0.1s ease-in-out;
  transition: color 0.1s ease-in-out,background-color 0.1s ease-in-out;
`

const IsAuthorizedMenuButton: React.FC<Props> = ({ permissionNames, isHidden, to, text, ...restProps }) => {
  const [hasPermission, isBusy] = useHasPermission(permissionNames)
  const isAuthorized = !isBusy && hasPermission
  /*
   ** Exception for "Digitaal toezicht".
   ** First it will be an external link, at a later stage it will be a library within AZA.
   ** If not authorized, link can be disabled or hidden.
   */
  if (isAuthorized && text === "Digitaal toezicht") {
    return (
      <StyledLink href={process.env.REACT_APP_HOST_TON} target="_blank" rel="noopener noreferrer">{ text }</StyledLink>
    )
  } else if (isAuthorized) {
    return (
      <StyledButtonLink to={ to }>
        <MenuButton { ...restProps }>{ text }</MenuButton>
      </StyledButtonLink>
    )
  } else if (isHidden) {
    return null
  } else {
    return (
      <StyledMenuButton disabled={ true } { ...restProps } title="U heeft geen permissie tot deze actie">
        { text }
      </StyledMenuButton>
    )
  }
}

export default IsAuthorizedMenuButton