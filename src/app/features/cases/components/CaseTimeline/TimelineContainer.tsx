import React from "react"
import styled from "styled-components"

import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import NextStep from "./NextStep"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import { mapCaseType } from "./helpers/Helpers"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

type EventProps = {
  index: number
  type?: string
  eventList?: Components.Schemas.CaseEvent[]
}

const Div = styled.div`
  >div[role="button"] {
    position: relative;
    display: flex;
    border-bottom: 20px solid white;

    &:last-child{
      //hide the thin line in the last timelinecontainer
      >div:nth-child(2){
        >div:first-child{
          &:after{
            display: none;
          }
        }
      }
    }
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId!)
  const { shouldCreateDebriefing, shouldCreateVisit, shouldCreateViolation, shouldCloseCase, shouldCreateAdditionalVisit } = workflow(data, true)
  const { visitIsDone, debriefIsDone } = workflow(data)
  let currentIndex = -1
  let currentType = ""
  let previousType = ""
  const allEventsInTime: EventProps[] = []

  const startNewEventList = (event: Components.Schemas.CaseEvent) => {
    previousType = currentType
    currentIndex++
    allEventsInTime.push({ "index": currentIndex, "type": currentType, "eventList":[event]})
  }

  const addEventToList = (event: Components.Schemas.CaseEvent) => {
    allEventsInTime[currentIndex].eventList?.push(event)
  }

  const doGroupEvents = (item: any) => {
    currentType = item.type
    currentType !== previousType ?
      startNewEventList(item)
    :
      addEventToList(item)
  }

  const drawReason = (eventList?: Components.Schemas.CaseEvent[]) =>
    eventList &&
      <TimelineWrapper key={eventList[0].id}>
        <Reason
          caseEvents={ eventList }
        />
      </TimelineWrapper>

  const drawDebrief = (index: number, eventList?: Components.Schemas.CaseEvent[]) =>
    eventList &&
      <TimelineWrapper key={eventList[0].id} >
        <Debrief
          caseEvents={ eventList }
          isDone={ index > 0 || (index === 0 && (shouldCreateViolation || shouldCloseCase || shouldCreateAdditionalVisit)) }
          isOpen={ index === 0 }
        />
      </TimelineWrapper>

const drawVisit = (index: number, eventList?: Components.Schemas.CaseEvent[]) =>
  eventList &&
    <TimelineWrapper key={eventList[0].id} >
      <Visit
        caseEvents={ eventList }
        isDone={ index > 0 || (visitIsDone && shouldCreateDebriefing) }
        isOpen={ index === 0 }
      />
    </TimelineWrapper>

  // TODO order list by date
  data?.forEach(doGroupEvents)

  const TimelineEvent = allEventsInTime.map(timelineEvent =>
     timelineEvent.type === "CASE"
      ? drawReason( timelineEvent.eventList)
      : timelineEvent.type === "VISIT"
        ? drawVisit(timelineEvent.index, timelineEvent.eventList)
        : timelineEvent.type === "DEBRIEFING" && drawDebrief(timelineEvent.index, timelineEvent.eventList)
    )
  return (
    <>
      <Div>
        { shouldCreateDebriefing &&
          <NextStep title={ mapCaseType("DEBRIEFING") } />
        }
        { (shouldCreateVisit || shouldCreateAdditionalVisit) &&
          <NextStep title={ mapCaseType("VISIT") } />
        }
        { debriefIsDone && shouldCreateViolation &&
          <NextStep title="Overtreding" />
        }
        { debriefIsDone && shouldCloseCase &&
          <NextStep title="Zaak afsluiten" />
        }
        { TimelineEvent }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
