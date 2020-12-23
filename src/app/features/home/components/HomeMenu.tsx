import React from "react"
import styled from "styled-components"
import { themeSpacing, breakpoint } from "@amsterdam/asc-ui"
import NavBlock from "app/features/addresses/components/NavBlock/NavBlock"
import to from "app/features/shared/routing/to"
import routesObject from "app/config/routes"

//TODO: styling is copied from "src/app/features/addresses/components/AddressMenu/AddressMenu.tsx"
const Menu = styled.menu`
  width: 100%;
  margin: 0;
  padding: 0;
`
const Ul = styled.ul`
  margin: 0 -${ themeSpacing(1.5) };
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`
const Li = styled.li`
  display: inline-block;
  width: 100%;
  margin-bottom: ${ themeSpacing(3) };
  @media screen and ${ breakpoint("min-width", "tabletS") } {
    width: 50%;
  }
  @media screen and ${ breakpoint("min-width", "laptop") } {
    width: 25%;
  }
`
const Div = styled.div`
  margin: 0 ${ themeSpacing(1.5) };
`

const items = [
    "/cases/", 
    "/invorderingen/"
  ]
  

const HomeMenu: React.FC = () => 
  <Menu>
    <Ul>
      { items.map((route) => {
        const page = routesObject[route]
        if (page?.icon === undefined || page?.title === undefined) return null
        const navBlock = <NavBlock to={ to( route ) } icon={ page.icon } header={ page.title } />
        return (
          <Li key={ route }>
            <Div>
                { navBlock }
            </Div>
          </Li>
        )
        })
      }
    </Ul>
  </Menu>
  
export default HomeMenu
