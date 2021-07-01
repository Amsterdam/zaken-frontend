import { ReactNode, useCallback, useState } from "react"
import { Button, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { SmallSkeleton } from "@amsterdam/wonen-ui"
import styled from "styled-components"


type Value = ReactNode
type Props = {
  numLoadingRows?: number
  numInitialVisibleRows?: number
  isLoading?: boolean
  title?: ReactNode
  values: Record<string, Value>
  startAlternative?: boolean
  headingSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const StyledTable = styled.table`
  border-spacing:0;
  width: 100%;
  margin-bottom: ${ themeSpacing(10) };
`

type StyledTRProps = { startAlternative?: boolean }
const StyledTR = styled.tr<StyledTRProps>`
  &:nth-of-type(${ (props: StyledTRProps) => props.startAlternative ? "odd" : "even" }) { background-color: ${ themeColor("tint", "level2") }; }
`

const StyledTD = styled.td`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  &:nth-child(1) { min-width: 240px; white-space: nowrap; padding-right: ${ themeSpacing(3) } }
  &:nth-child(2) { width:100%; }
`

const StyledButton = styled(Button)`
  margin: ${ themeSpacing(3) } ${ themeSpacing(1) };
`

type LoadingRowsProps = {
  numRows: number
}
const LoadingRows: React.FC<LoadingRowsProps> = ({ numRows }) => <>
  { [...Array(numRows)].map((_, index) => (
    <StyledTR key={ index }>
      <StyledTD><SmallSkeleton /></StyledTD>
      <StyledTD><SmallSkeleton /></StyledTD>
    </StyledTR>
  )) }
</>

const castValue = (value: Value): ReactNode => {
  if (value == null) return "-"
  if (typeof value === "number") return `${ value }`
  return value
}

const Details: React.FC<Props> = ({ isLoading, numLoadingRows, numInitialVisibleRows = Number.MAX_VALUE, title, values, startAlternative = true, headingSize = "h2" }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [setIsCollapsed, isCollapsed])

  const valueEntries = Object.entries(values)

  const isCollapsible = valueEntries.length > numInitialVisibleRows

  const rows = isCollapsible && isCollapsed
    ? valueEntries.slice(0, numInitialVisibleRows)
    : valueEntries

  return (<>
    { title && <Heading forwardedAs={ headingSize }>{ isLoading ? <SmallSkeleton height={10} /> : title}</Heading> }
    <StyledTable>
      <tbody>
      { isLoading
        ? <LoadingRows numRows={numLoadingRows ?? 5} />
        : <>
            { rows
              .map(([key, value]) => (
                <StyledTR key={key} startAlternative={ startAlternative }>
                  <StyledTD>{ key }</StyledTD>
                  <StyledTD>{ castValue(value) }</StyledTD>
                </StyledTR>
              )) }
            { isCollapsible && isCollapsed && <tr><td><StyledButton variant="textButton" onClick={toggleCollapsed}> + Toon alle </StyledButton></td></tr> }
            { isCollapsible && !isCollapsed && <tr><td><StyledButton variant="textButton" onClick={toggleCollapsed}> - Toon minder </StyledButton></td></tr> }
          </>
        }
      </tbody>
    </StyledTable>
  </>)
}


export default Details
