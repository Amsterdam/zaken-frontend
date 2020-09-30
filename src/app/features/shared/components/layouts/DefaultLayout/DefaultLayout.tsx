import React from "react"
import { Header } from "@datapunt/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/features/shared/components/organisms/navigation/DefaultNavigation"
import MainWrapper from "app/features/shared/components/atoms/MainWrapper/MainWrapper"
import to from "app/features/shared/routing/to"
import FlashMessages from "app/features/shared/components/molecules/FlashMessages/FlashMessages"

type Props = {
  showSearchButton?: boolean
}
const MenuWithSearchButtonWrap = styled.div`
  margin-right: auto;
  position: relative;
  width: 100%;
`

const DefaultLayout: React.FC<Props> = ({ showSearchButton = true, children }) => (
  <>
    <Header
      tall
      title="Zaaksysteem Wonen"
      homeLink={to("/")}
      navigation={
        <MenuWithSearchButtonWrap>
          <DefaultNavigation showSearchButton={showSearchButton} />
        </MenuWithSearchButtonWrap>}
      />
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
