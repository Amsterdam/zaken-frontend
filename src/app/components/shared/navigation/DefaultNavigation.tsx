import { useAuth } from "react-oidc-context"
import { MenuInline, Button, MenuToggle } from "@amsterdam/asc-ui"
import styled from "styled-components"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import MenuItems from "app/components/shared/navigation/MenuItems"
import UserInfo from "../UserInfo/UserInfo"
import CustomIcon from "../CustomIcon/CustomIcon"
import Hidden from "app/components/shared/Hidden/Hidden"

type Props = {
  showSearchButton: boolean
}

const IconButton = styled(Button)`
  background-color: transparent;
`

const DefaultNavigation: React.FC<Props> = ({ showSearchButton }) => {
  const auth = useAuth()
  const token = auth.user?.access_token

  if (!token) return null

  return (
    <>
      <Hidden maxBreakpoint="laptopM">
        <MenuInline>
          <MenuItems />
        </MenuInline>
      </Hidden>
      <div style={{ marginRight: "-10px" }}>
        <Hidden maxBreakpoint="laptopM">
          <ButtonLink to={ to("/hulp") } title="Help">
            <IconButton 
              size={ 50 }   
              variant="blank" 
              iconSize={ 28 } 
              icon={ <CustomIcon name="Help" /> } 
              tabIndex={ -1 } 
            />
          </ButtonLink>
        </Hidden>
        { showSearchButton &&
          <ButtonLink to={ to("/") } title="Zoeken">
            <IconButton 
              size={ 50 } 
              variant="blank" 
              iconSize={ 28 } 
              icon={ <CustomIcon name="Search" /> } 
              tabIndex={ -1 } 
            />
          </ButtonLink>
        }
      </div>
      <Hidden minBreakpoint="laptopM">
        <MenuToggle align="right">
          <MenuItems />
          <UserInfo showAsListItem={true} />
        </MenuToggle>
      </Hidden>
    </>
  )
}

export default DefaultNavigation
