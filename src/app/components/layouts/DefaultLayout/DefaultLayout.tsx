import React from "react"
import { Header } from "@amsterdam/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/components/shared/navigation/DefaultNavigation"
import MainWrapper from "app/components/layouts/MainWrapper/MainWrapper"
import to from "app/routing/utils/to"
import FlashMessages from "app/components/layouts/FlashMessages/FlashMessages"
import UserInfo from "app/components/shared/UserInfo/UserInfo"

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

const DefaultLayout: React.FC<Props> = ({ showSearchButton = true, children }) => (
  <>
    <HeaderWrap>
      <Header
        tall
        fullWidth={ false }
        title="Zaaksysteem Wonen"
        homeLink={ to("/") }
        navigation={
          <MenuWrap>
            <DefaultNavigation showSearchButton={ showSearchButton } />
          </MenuWrap>
        }
        links={ <UserInfo /> }
      />
    </HeaderWrap>
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
