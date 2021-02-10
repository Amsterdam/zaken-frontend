import React from "react"
import styled from "styled-components"

import { useCaseEvents } from "app/state/rest"
import useGroupedCaseEvents from "./hooks/useGroupedCaseEvents"
import TimelineEvent from "./TimelineEvent"
import { Spinner, themeSpacing } from "@amsterdam/asc-ui"

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

  const { data } = useCaseEvents(caseId)
  const allEventsInTime = useGroupedCaseEvents(caseId)

  return (
    <>
      <Div>
        {
          allEventsInTime === undefined ?
            <Spinner /> :
            allEventsInTime.map(item =>
              <TimelineEvent
                key={ item.index }
                timelineEventItem={ item }
                />)
        }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
