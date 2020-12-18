import React from "react"
import styled from "styled-components"

import { useCaseEvents } from "app/state/rest"
import useGroupedCaseEvents from "./hooks/useGroupedCaseEvents"
import workflow from "app/state/workflow/workflow"
import TimelineEvent from "./TimelineEvent"
import NextSteps from "./NextSteps"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const Div = styled.div`
  >div[role="button"] {
    position: relative;
    display: flex;
    border-bottom: 20px solid white;

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
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {

  const { data } = useCaseEvents(caseId)
  const { shouldCreateDebriefing, shouldCreateViolation, shouldCloseCase, shouldCreateAdditionalVisit } = workflow(data, true)
  const { visitIsDone } = workflow(data)

  const allEventsInTime = useGroupedCaseEvents(caseId)

  return (
    <>
      <Div>
        <NextSteps caseId={ caseId } />
        { allEventsInTime.map(item =>
            <TimelineEvent
              timelineEventItem={ item }
              isDone={
                (item.type === "DEBRIEF" && (shouldCreateViolation || shouldCloseCase || shouldCreateAdditionalVisit)) ||
                (item.type === "VISIT" && (visitIsDone && shouldCreateDebriefing))
              }
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
