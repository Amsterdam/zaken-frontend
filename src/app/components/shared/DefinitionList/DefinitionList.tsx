import { useCallback, useState } from "react"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import SmallSkeleton from "app/components/shared/Skeleton/SmallSkeleton"
import ToggleCollapse from "app/components/shared/ToggleCollapse/ToggleCollapse"
import InfoButton from "../InfoHeading/InfoButton"
import Definition from "./components/Definition"
import LoadingRows from "./components/LoadingRows"

type Props = {
  numLoadingRows?: number
  numInitialVisibleRows?: number
  isLoading?: boolean
  title?: React.ReactNode
  extraInfo?: { infoTitle: string, infoText: string }
  values: Record<string, React.ReactNode>
  headingSize?: React.ComponentProps<typeof Heading>["forwardedAs"]
}

const Dl = styled.dl`
  margin-bottom: ${ themeSpacing(10) };
`

const DefinitionList: React.FC<Props> = ({
  isLoading,
  numLoadingRows = 5,
  numInitialVisibleRows = Number.MAX_VALUE,
  title,
  values,
  extraInfo,
  headingSize = "h2"
}) => {

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
            { rows.map(([term, value]) => <Definition key={ term } term={ term } value={ value } />) }
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
