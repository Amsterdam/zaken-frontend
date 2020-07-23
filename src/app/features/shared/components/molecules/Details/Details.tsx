import React from "react"
import { Heading, themeColor, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  title?: string
  values: Record<string, string|number|JSX.Element|undefined|null>
}

const StyledHeading = styled(Heading)`
  margin-bottom: ${ themeSpacing(4) };
`

const StyledTable = styled.table`
  border-spacing:0;
  width: 100%;
  margin-bottom: ${ themeSpacing(10) };
`

const StyledTR = styled.tr`
  &:nth-of-type(odd) { background-color: ${ themeColor("tint", "level2") }; }
`

const StyledTD = styled.td`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };    
  &:nth-child(1) { min-width: 300px; white-space: nowrap; padding-right: ${ themeSpacing(3) } } 
  &:nth-child(2) { width:100%; } 
`

const capitalize = (str: string) => str.replace(/^\w/, c => c.toUpperCase())
const humanize = (str: string) => capitalize(str.replace(/_/g, " "))

const Details: React.FC<Props> = ({ title, values }) => (<>
  { title && <StyledHeading>{title}</StyledHeading> }
  <StyledTable>
    <tbody>
    { Object
      .entries(values)
      .map(([key, value]) => (
        <StyledTR key={key}>
          <StyledTD>{ humanize(key) }</StyledTD>
          <StyledTD>{ value?.toString() ?? "-" }</StyledTD>
        </StyledTR>
      )) }
    </tbody>
  </StyledTable>
</>)

export default Details
