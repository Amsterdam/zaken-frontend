import React from "react"
import { breakpoint, Header } from "@datapunt/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/features/shared/components/molecules/navigation/DefaultNavigation"
import MainWrapper from "app/features/shared/components/atoms/MainWrapper/MainWrapper"
import to from "app/features/shared/routing/to"
import FlashMessages from "app/features/shared/components/molecules/FlashMessages/FlashMessages"

type Props = {
  showSearchButton?: boolean
}

const Div = styled.div`
  position: relative;
  z-index: 2;
`
const MenuWithSearchButtonWrap = styled.div`
  display: flex;
  >ul {
    width: calc(100% - 70px);
  }

  @media screen and ${ breakpoint("min-width", "laptopM") } {
    margin-right: auto;
    width: 100%;

  }
`


const DefaultLayout: React.FC<Props> = ({ showSearchButton = true, children }) => (
  <>
    <Div>
      <Header
        tall
        fullWidth={false}
        title="Zaaksysteem Wonen"
        homeLink={to("/")}
        navigation={<MenuWithSearchButtonWrap>
          <DefaultNavigation showSearchButton={showSearchButton} />
        </MenuWithSearchButtonWrap>}
      />
    </Div>  
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
