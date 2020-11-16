import React from "react"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import { mapCaseType } from "../helpers/Helpers"
import VisitData from "./VisitData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isDone?: boolean
  isOpen?: boolean
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
