
import { Header } from "@amsterdam/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/components/shared/navigation/DefaultNavigation"
import MainWrapper from "app/components/layouts/MainWrapper/MainWrapper"
import to from "app/routing/utils/to"
import FlashMessages from "app/components/layouts/FlashMessages/FlashMessages"
import UserInfo from "app/components/shared/UserInfo/UserInfo"
import SkipLink from "app/components/shared/SkipLinks/SkipLink"
import BreadCrumbs from "app/components/shared/BreadCrumbs/BreadCrumbs"

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
  justify-content: space-between;
  width: 100%;
`
const BreadCrumbWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 1430px;
  margin: 0 auto;
  padding: 12px 50px;
`

const DefaultLayout: React.FC<Props> = ({ showSearchButton = true, children }) => (
  <>
    <SkipLink/>
    <HeaderWrap>
      <Header
        tall
        fullWidth={ false }
        title="Amsterdamse Zaak Administratie"
        homeLink={ to("/") }
        navigation={
          <MenuWrap>
            <DefaultNavigation showSearchButton={ showSearchButton } />
          </MenuWrap>
        }
        links={ <UserInfo /> }
      />
      <BreadCrumbWrap>
        <BreadCrumbs />
      </BreadCrumbWrap>
    </HeaderWrap>
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
