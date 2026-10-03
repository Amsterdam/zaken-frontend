import { MenuButton } from "@amsterdam/asc-ui"
import styled from "styled-components"
import useHasPermission from "@/hooks/useHasPermission"
import StyledButtonLink from "./StyledButtonLink"

type Props = React.ComponentProps<typeof MenuButton> & {
  permissionNames: components["schemas"]["PermissionsEnum"][]
  to: string
  text: string | undefined
}

const StyledMenuButton = styled(MenuButton)`
  background: none !important;
  margin-left: 8px;
  span {
    color: #b4b4b4 !important;
    border-bottom: none !important;
  }
`

const IsAuthorizedMenuButton: React.FC<Props> = ({
  permissionNames,
  to,
  text,
  ...restProps
}) => {
  const [hasPermission, isBusy] = useHasPermission(permissionNames)
  const isAuthorized = !isBusy && hasPermission
  if (isAuthorized) {
    return (
      <StyledButtonLink to={to}>
        <MenuButton {...restProps}>{text}</MenuButton>
      </StyledButtonLink>
    )
  } else {
    return (
      <StyledMenuButton
        disabled={true}
        {...restProps}
        title="U heeft geen permissie tot deze actie"
      >
        {text}
      </StyledMenuButton>
    )
  }
}

export default IsAuthorizedMenuButton
