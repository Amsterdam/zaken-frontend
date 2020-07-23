import React from "react"
import { themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"

import DefaultLayout from "../DefaultLayout/DefaultLayout"

const GUTTER = 6

const Wrap = styled.div`
  display:flex;
  margin: 0 -${ themeSpacing(GUTTER) };
`

const Column = styled.div`  
  padding: 0 ${ themeSpacing(GUTTER) };
  
  &:nth-child(1) { flex: 40%; }
  &:nth-child(2) { flex: 60%; }  
`

type Props = {
  left?: JSX.Element
  right?: JSX.Element
}

const TwoColumnLayout: React.FC<Props> = ({ left, right }) => (
  <DefaultLayout>
    <Wrap>
      <Column>{ left }</Column>
      <Column>{ right }</Column>
    </Wrap>
  </DefaultLayout>
)

export default TwoColumnLayout
