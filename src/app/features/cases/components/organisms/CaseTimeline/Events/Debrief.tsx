import React from "react"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import { Dl, DLProps, mapCaseType } from "../helpers/Helpers"
import { debriefViolationMap, debriefLabelsMap } from "../helpers/Dictionaries"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isDone?: boolean
}

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
        { showDate && value.date_added && <div><dt>Datum</dt><dd>{ displayDate(value.date_added) }</dd></div> }
        {/* TODO use map here
        iterate over event_values (from endpoint) and check if key is in debriefLabelsMap ?
        if it is, render it, 
        if it's not, skip it
        
        */}
        
        <div>
            <dt>{ debriefLabelsMap["author"] }</dt>
            <dd>{ value.author }</dd>
        </div>
        <div>
            <dt>{ debriefLabelsMap["feedback"] }</dt>
            <dd>{ value.feedback ? value.feedback : "-" }</dd>
        </div>
        <div>
            <dt>{ debriefLabelsMap["violation"] }</dt>
            <dd>{ value.violation ? debriefViolationMap[value.violation] : "-" }</dd>
        </div>
    </Dl>
  )
}

const Debrief: React.FC<Props> = ({ caseEvents, isDone }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_added ? `${ getDay(thread.event_values.date_added, true) } ${ displayDate(thread.event_values.date_added) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isDone={true}
        largeCircle={false}
        isNested={true}
      >
        <DefinitionList
          thread={ thread }
          showDate={false}
        />
      </Timeline>
      :
        <DefinitionList
          key={ thread.id }
          thread={ thread }
          showDate={true}
        />
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""

  return (
    <>
    { currentEvent &&
    <Timeline
      title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
      isDone={ isDone }
      isOpen={ !isDone }
    >
      { TimelineThread }
    </Timeline>
    }
    </>
  )
}

export default Debrief
