import React from "react"
import styled from "styled-components"
import { Timeline, TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import { mapCaseType } from "./helpers/Helpers"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

type NextStepProp = {
  title: string
}

type EventProps = {
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

const NextStep: React.FC<NextStepProp> = ({ title }) => 
  <TimelineWrapper >
    <Timeline
      title= { title }
      isDone={ false }
      canBeOpened={false}
    />
  </TimelineWrapper>

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId!)
  const { shouldCreateDebriefing, shouldCreateVisit, shouldCreateViolation, shouldCloseCase } = workflow(data, true)
  const { visitIsDone, debriefIsDone } = workflow(data)
  let currentIndex = -1
  let currentType = ""
  let previousType = ""
  const allEventsInTime: EventProps[] = []

  const startNewEventList = (event: Components.Schemas.CaseEvent) => {
    previousType = currentType
    allEventsInTime.push({ "type": currentType, "eventList":[event]})
    currentIndex++
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
    
  const drawDebrief = (eventList?: Components.Schemas.CaseEvent[]) => 
    eventList &&
      <TimelineWrapper key={eventList[0].id} >
        <Debrief
          caseEvents={ eventList }
          isDone={ debriefIsDone }
          isOpen={ !debriefIsDone || (debriefIsDone && (shouldCreateViolation || shouldCloseCase)) }
        />
      </TimelineWrapper>

const drawVisit = (eventList?: Components.Schemas.CaseEvent[]) => 
  eventList &&
    <TimelineWrapper key={eventList[0].id} >
      <Visit
        caseEvents={ eventList } 
        isDone={ visitIsDone }
        isOpen={ !visitIsDone || (visitIsDone && shouldCreateDebriefing) } 
      />
    </TimelineWrapper>
      
  // TODO order list by date
  data?.forEach(doGroupEvents)

  const TimelineEvent = allEventsInTime.map(timelineEvent => 
     timelineEvent.type === "CASE" 
      ? drawReason(timelineEvent.eventList)
      : timelineEvent.type === "VISIT" 
        ? drawVisit(timelineEvent.eventList)
        : timelineEvent.type === "DEBRIEFING" && drawDebrief(timelineEvent.eventList)
    )
  return (
    <>
      
      <Div>
        {/* TODO
        check next step only for last event?
        when there are more seperate Visit-events on timeline check only the last one for "Access_granted"
         */}
        
        { shouldCreateDebriefing &&
          <NextStep title={ mapCaseType("DEBRIEFING") } />
        }
        { shouldCreateVisit &&
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
