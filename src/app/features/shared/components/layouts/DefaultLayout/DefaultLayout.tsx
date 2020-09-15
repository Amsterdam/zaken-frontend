import React from "react"
import { Header } from "@datapunt/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/features/shared/components/organisms/navigation/DefaultNavigation"
import { MainWrapper } from "app/features/shared/components/atoms/MainWrapper/MainWrapper"
import to from "app/features/shared/routing/to"
import FlashMessages from "app/features/shared/components/molecules/FlashMessages/FlashMessages"

const MenuWithSearchButtonWrap = styled.div`
  margin-right: auto;
  position: relative;
  width: 100%;
`

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header 
      tall 
      title="Zaken" 
      homeLink={to("/")} 
      navigation={
        <MenuWithSearchButtonWrap>
          <DefaultNavigation />
        </MenuWithSearchButtonWrap>}
      />
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
