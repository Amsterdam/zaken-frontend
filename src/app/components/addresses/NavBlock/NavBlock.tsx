import styled from "styled-components"
import { Link } from "@reach/router"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"
import { Card, CardContent, Icon, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/Icons"

type Props = {
  to: string
  icon: keyof typeof Assets
  header: string
  count?: string | number
  permissionName?: Components.Schemas.PermissionsEnum
}

const Wrap = styled.div<{ disabled: boolean }>`
  opacity: ${ ({ disabled }) => disabled ? 0.3 : 1 };
  &:hover {
    cursor: ${ ({ disabled }) => disabled ? "inherit" : "pointer" };
  }
`

const StyledCard = styled(Card)`
  height: 162px;
  &:hover {
    box-shadow: 2px 2px ${ themeColor("secondary") };
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${ themeColor("tint", "level7") };
  &:hover {
    text-decoration: underline;
  }
`

const StyledHeading = styled(Heading)`
  margin-top: ${ themeSpacing(4) };
`

const NavBlock: React.FC<Props> = ({ to: toPath, icon, header, count, permissionName }) => {

  const [hasPermission] = useHasPermission(permissionName)

  const Asset = Assets[icon]
  const card = (
    <Wrap disabled={ !hasPermission }>
      <StyledCard backgroundColor="level2" shadow>
        <CardContent>
          { Asset && <Icon size={ 48 }><Asset /></Icon> }
          <StyledHeading as="h3">{ header }{ count ? ` (${ count })` : "" }</StyledHeading>
        </CardContent>
      </StyledCard>
    </Wrap>
  )

  return hasPermission ? <StyledLink to={ toPath }>{ card }</StyledLink> : card
}

export default NavBlock
