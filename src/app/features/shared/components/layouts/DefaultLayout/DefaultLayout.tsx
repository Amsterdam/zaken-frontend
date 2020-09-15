import React from "react"
import { Header, MenuInline, MenuItem, MenuButton, MenuFlyOut, SearchBar } from "@datapunt/asc-ui"
import styled from "styled-components"
import DefaultNavigation from "app/features/shared/components/organisms/navigation/DefaultNavigation"
import { MainWrapper } from "app/features/shared/components/atoms/MainWrapper/MainWrapper"
import to from "app/features/shared/routing/to"
import FlashMessages from "app/features/shared/components/molecules/FlashMessages/FlashMessages"


const LeftAlignWrap = styled.div`
  margin-right: auto;
`


const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header 
      tall 
      title="Zaken" 
      homeLink={to("/")} 
      navigation={
        <LeftAlignWrap>
        <MenuInline >
          <MenuItem>
            <MenuButton forwardedAs="a" href="/" active>
              Menu item
            </MenuButton>
          </MenuItem>
          <MenuFlyOut label="Menu item 2">
            <MenuItem>
              <MenuButton forwardedAs="a" href="/" active>
                Submenu item
              </MenuButton>
            </MenuItem>
          </MenuFlyOut>
        </MenuInline>
        </LeftAlignWrap>}
        />

<span>haai</span>
        <SearchBar
        placeholder="Enter the search text"
        onChange={() => {
          
        }}
      />
    <MainWrapper>
      <FlashMessages />
      { children }
    </MainWrapper>
  </>
)

export default DefaultLayout
