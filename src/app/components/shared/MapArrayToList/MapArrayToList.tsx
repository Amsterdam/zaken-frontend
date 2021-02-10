import { themeSpacing } from "@amsterdam/asc-ui"
import React from "react"
import styled from "styled-components"


const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
  }
`

const MapArrayToUl = (list: any) =>
  <UnstyledList>
    { list.map((item: any, index: number) =>
        <li key={ index }>{ item }</li>
    )}
  </UnstyledList>

export default MapArrayToUl