import { breakpoint, Header } from "@amsterdam/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/components/shared/navigation/DefaultNavigation"
import MainWrapper from "app/components/layouts/MainWrapper/MainWrapper"
import to from "app/routing/utils/to"
import FlashMessages from "app/components/layouts/FlashMessages/FlashMessages"
import UserInfo from "app/components/shared/UserInfo/UserInfo"
import SkipLinks from "app/components/shared/SkipLinks/SkipLinks"
import BreadCrumbsWrap from "app/components/shared/BreadCrumbs/BreadCrumbsWrap"
import { env } from "app/config/env"

type Props = {
  showSearchButton?: boolean
}

// This is needed to fix a bug where SVG where displayed above the header / menu.
// Caused by the CSS property `position: fixed`.
const HeaderWrap = styled.div`
  > div {
    z-index: 1;
  }
`

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media screen and ${ breakpoint("min-width", "laptopM") } {
    justify-content: space-between;
    
    ul {
      margin-left: -10px;
    }
  }
`

const DefaultLayout: React.FC<Props> = ({ showSearchButton = true, children }) => (
  <>
    <SkipLinks linkList={ [
      { title: "Direct naar: inhoud", target: "a11y_content" }
    ] }/>
    <HeaderWrap>
      <Header
        tall
        fullWidth={ false }
        title={`${ env.VITE_APP_TITLE ?? "Amsterdamse Zaak Administratie" } ${ env.VITE_ENVIRONMENT_SHORT }`}
        homeLink={ to("/") }
        navigation={
          <MenuWrap>
            <DefaultNavigation showSearchButton={ showSearchButton } />
          </MenuWrap>
        }
        links={ <UserInfo /> }
      />
      <BreadCrumbsWrap />
    </HeaderWrap>
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
