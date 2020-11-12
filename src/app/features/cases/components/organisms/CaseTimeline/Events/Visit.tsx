import React from "react"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate, displayTime } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import { Dl, DLProps, mapCaseType, mapArrayToUl } from "../helpers/Helpers"
import { visitEventValuesMap, visitLabelsMap, visit_go_ahead } from "../helpers/Dictionaries"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isDone?: boolean
  isOpen?: boolean
}

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
        { showDate && value.start_time && <div><dt>Datum</dt><dd>{ displayDate(value.start_time) }</dd></div> }
        {/* TODO use map here
        iterate over event_values (from endpoint) and check if key is in debriefLabelsMap ?
        if it is, render it, 
        if it's not, skip it
        
        */}
        
        <div>
            <dt>{ visitLabelsMap["author"] }</dt>
            <dd>{ value.author }</dd>
        </div>
        { value.start_time &&
        <div>
            <dt>{ visitLabelsMap["start_time"] }</dt>
            <dd>{ displayTime(value.start_time) }</dd>
        </div>
      }
      { value.authors.length > 0 &&
        <div>
          <dt>{ visitLabelsMap["authors"] }</dt>
          <dd>{ mapArrayToUl(value.authors) }</dd>
        </div>
      }
      { value.situation &&
        <div>
          <dt>{ visitLabelsMap["situation"] }</dt>
          <dd>{ visitEventValuesMap[value.situation] }</dd>
        </div>
      }
      { value.situation && value.situation === "access_granted" &&
        <div>
          <dt>{ visitLabelsMap["notes"] }</dt>
          <dd>{ value.notes }</dd>
        </div>
      }
      { value.observations.length > 0 &&
        <div>
          <dt>{ visitLabelsMap["observations"] }</dt>
          <dd>{ mapArrayToUl(value.observations, true) }</dd>
        </div>
      }
      { value.suggest_next_visit &&
        <div>
            <dt>{ visitLabelsMap["suggest_next_visit"] }</dt>
            <dd>{ value.suggest_next_visit }</dd>
        </div>
      }
      { value.suggest_next_visit && value.suggest_next_visit_description &&
        <div>
          <dt>{ visitLabelsMap["suggest_next_visit_description"] }</dt>
          <dd>{ value.suggest_next_visit_description }</dd>
        </div>
      }
      { value.can_next_visit_go_ahead &&
        <div>
            <dt>{ visitLabelsMap["can_next_visit_go_ahead"] }</dt>
            <dd>{ visit_go_ahead[value.can_next_visit_go_ahead as string] }</dd>
        </div>
      }
      { value.can_next_visit_go_ahead && value.can_next_visit_go_ahead_description &&
        <div>
          <dt>{ visitLabelsMap["can_next_visit_go_ahead_description"] }</dt>
          <dd>{ value.can_next_visit_go_ahead_description }</dd>
        </div>
      }
    </Dl>
  )
}

const Visit: React.FC<Props> = ({ caseEvents, isDone, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.start_time ? `${ getDay(thread.event_values.start_time, true) } ${ displayDate(thread.event_values.start_time) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isDone={true}
        isOpen={isOpen}
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
      isOpen={ isOpen }
    >
      { TimelineThread }
    </Timeline>
    }
    </>
  )
}

export default Visit
