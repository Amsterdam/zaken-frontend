import React from "react"
import { Heading, themeColor, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  title?: string
  values: Record<string, string|number|JSX.Element|undefined|null>
}

const StyledTable = styled.table`
  width: 100%;
`

const StyledTD = styled.td`
  padding: ${ themeSpacing(3) } 0;
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
  
  &:nth-child(1) { white-space: nowrap; padding-right: ${ themeSpacing(2) } } 
  &:nth-child(2) { width:100%; } 
`


const Details: React.FC<Props> = ({ title, values }) => (<>
  { title && <Heading>{title}</Heading> }
  <StyledTable>
    { Object
      .entries(values)
      .map(([key, value]) => (
        <tr key={key}>
          <StyledTD>{ key }</StyledTD>
          <StyledTD>{  value }</StyledTD>
        </tr>
      )) }
  </StyledTable>
</>)

export default Details
