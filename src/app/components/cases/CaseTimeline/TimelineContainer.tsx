import React from "react"
import styled from "styled-components"

import useGroupedCaseEvents from "./hooks/useGroupedCaseEvents"
import TimelineEvents from "./components/TimelineEvents"
import { Spinner, themeSpacing, ErrorMessage } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const Div = styled.div`
  >div[role="button"] {
    position: relative;
    margin-bottom: ${ themeSpacing(6) };

    &:last-child {
      // hide the thin line in the last timelinecontainer
      >div:nth-child(2) {
        >div:first-child {
          &:after {
            display: none;
          }
        }
      }
    }

    button {
      outline: none;
    }
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {

  const [timelineEvents, { hasErrors }] = useGroupedCaseEvents(caseId)
  const showEmpty = timelineEvents?.length === 0

  return (
    <>
      <Div>
        { timelineEvents === undefined ?
            <Spinner /> :
            <TimelineEvents items={ timelineEvents } />
        }
      </Div>
      { hasErrors &&
        <ErrorMessage message="Laden van tijdlijn evenementen mislukt" />
      }
      { showEmpty &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
