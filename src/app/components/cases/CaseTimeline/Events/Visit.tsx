import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { Timeline } from "app/components/shared/Timeline"
import { mapCaseType } from "../helpers/Helpers"
import VisitData from "./VisitData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}

const Visit: React.FC<Props> = ({ caseEvents, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.start_time ? `${ getDay(thread.event_values.start_time, true) } ${ displayDate(thread.event_values.start_time) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isOpen={isOpen}
        largeCircle={false}
        isNested={true}
      >
        <VisitData
          thread={ thread }
          showDate={false}
        />
      </Timeline>
      :
        <VisitData
          key={ thread.id }
          thread={ thread }
          showDate={true}
        />
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""
  return (
    <>
    { currentEvent ?
      <Timeline
        title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
        isOpen={ isOpen }
      >
        { TimelineThread }
      </Timeline>
    :
      <Timeline
        title="Er zijn geen huisbezoeken"
        canBeOpened={false}
      />
    }
    </>
  )
}

export default Visit
