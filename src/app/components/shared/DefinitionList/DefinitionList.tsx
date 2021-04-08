import { FC, ReactNode, useCallback, useState } from "react"
import {  Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import SmallSkeleton from "app/components/shared/Skeleton/SmallSkeleton"
import ToggleCollapse from "app/components/shared/ToggleCollapse/ToggleCollapse"
import InfoButton from "../InfoHeading/InfoButton"

type Value = ReactNode
type Props = {
  numLoadingRows?: number
  numInitialVisibleRows?: number
  isLoading?: boolean
  title?: ReactNode
  extraInfo?: {infoTitle: string, infoText: string}
  values: Record<string, Value>
  headingSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Div = styled.div`
  overflow: auto;
  border-bottom: 1px solid ${ themeColor("tint","level3") };
  &:last-child {
    border-bottom: none;
  }
`

const Dl = styled.dl`
  width: 100%;
  margin-bottom: ${ themeSpacing(10) };

  dd, dt {
    width: 50%;
    padding: ${ themeSpacing(3) } 0;
  }
  dt {
    float: left;
    clear: both;
    padding-right: ${ themeSpacing(5) };
    word-wrap: break-word;
    color: ${ themeColor("tint", "level5") };
  }
  dd {
    margin: 0;
    padding-right: 20px;
    float: right;
    clear: right;
  }
`

type LoadingRowsProps = {
  numRows: number
}
const LoadingRows: FC<LoadingRowsProps> = ({ numRows }) => <>
  { [...Array(numRows)].map((_, index) => (
    <div key={ index }>
      <dt><SmallSkeleton /></dt>
      <dd><SmallSkeleton /></dd>
    </div>
  )) }
</>

const castValue = (value: Value): ReactNode => {
  if (value == null) return "-"
  if (typeof value === "number") return `${ value }`
  return value
}

const DefinitionList: FC<Props> = ({ isLoading, numLoadingRows = 5, numInitialVisibleRows = Number.MAX_VALUE, title, values, extraInfo, headingSize = "h2" }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [setIsCollapsed, isCollapsed])

  const valueEntries = Object.entries(values)

  const isCollapsible = valueEntries.length > numInitialVisibleRows

  const rows = isCollapsible && isCollapsed
    ? valueEntries.slice(0, numInitialVisibleRows)
    : valueEntries

  return (
    <div>
      { title &&
        <Heading forwardedAs={ headingSize }>
          { isLoading ? <SmallSkeleton height={10} /> : title }
          { extraInfo &&
            <InfoButton infoTitle={ extraInfo.infoTitle } infoText={ extraInfo.infoText } />
          }
        </Heading>
      }
      <Dl>
        { isLoading ?
          <LoadingRows numRows={ numLoadingRows } /> :
          <>
            { rows.map(([key, value]) => (
              <Div key={key}>
                <dt>{ key }</dt>
                <dd>{ castValue(value) }</dd>
              </Div>
            )) }
          </>
        }
      </Dl>
      { isCollapsible &&
        <ToggleCollapse onClick={toggleCollapsed} isCollapsed={isCollapsed} />
      }
    </div>
  )
}

export default DefinitionList
