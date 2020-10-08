import React, { useCallback, useState } from "react"
import { Button, Heading, themeColor, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"

import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"

type Value = string | number | JSX.Element | undefined | null
type Props = {
  numLoadingRows?: number
  numInitialVisibleRows?: number
  isLoading?: boolean
  title?: string | JSX.Element
  values: Record<string, Value>
  headingSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const StyledDL = styled.dl`
  width: 100%;
  margin-bottom: ${ themeSpacing(10) };

  &:after {
    clear: both;
    content: "";
    display: table;
  }

  dd, dt {
    width: 50%;
    border-bottom: 1px solid ${ themeColor("tint","level3") };
    padding: ${ themeSpacing(3) } 0; 
  }
  dt {
    float: left;
    clear: both;
    word-wrap: break-word;
    padding-right: ${ themeSpacing(5) }; 
  }
  dd {
    margin: 0;
    padding-right: 20px;
    float: right;
    clear: right;
  }
`

const StyledButton = styled(Button)`
  margin: ${ themeSpacing(3) } ${ themeSpacing(1) };
`

type LoadingRowsProps = {
  numRows: number
}
const LoadingRows: React.FC<LoadingRowsProps> = ({ numRows }) => <>
  { [...Array(numRows)].map((_, index) => (
    <div key={ index }>
      <dt><SmallSkeleton /></dt>
      <dd><SmallSkeleton /></dd>
    </div>
  )) }
</>

const castValue = (value: Value): string|JSX.Element => {
  if (value == null) return "-"
  if (typeof value === "number") return `${ value }`
  return value
}

const DefinitionList: React.FC<Props> = ({ isLoading, numLoadingRows, numInitialVisibleRows = Number.MAX_VALUE, title, values, headingSize = "h2" }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [setIsCollapsed, isCollapsed])

  const valueEntries = Object.entries(values)

  const isCollapsible = valueEntries.length > numInitialVisibleRows

  const rows = isCollapsible && isCollapsed
    ? valueEntries.slice(0, numInitialVisibleRows)
    : valueEntries

  return (<>
    { title && <Heading forwardedAs={ headingSize }>{ isLoading ? <SmallSkeleton height={10} /> : title}</Heading> }
    <StyledDL>
      
      { isLoading
        ? <LoadingRows numRows={numLoadingRows ?? 5} />
        : <>
            { rows
              .map(([key, value]) => (
                <div key={key}>
                  <dt>{ key }</dt>
                  <dd>{ castValue(value) || "-" }</dd>
                </div>
              )) }
            
          </>
        }
    </StyledDL>
    { isCollapsible && isCollapsed && <div><StyledButton variant="textButton" onClick={toggleCollapsed}> + Toon alle </StyledButton></div> }
    { isCollapsible && !isCollapsed && <div><StyledButton variant="textButton" onClick={toggleCollapsed}> - Toon minder </StyledButton></div> }
  </>)
}


export default DefinitionList
