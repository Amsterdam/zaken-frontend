import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { Timeline } from "app/components/shared/Timeline"
import GenericTaskData from "./GenericTaskData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}

const Summon: React.FC<Props> = ({ caseEvents, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_added ? `${ getDay(thread.event_values.date_added, true) } ${ displayDate(thread.event_values.date_added) }` : thread.event_values.description }
        key={thread.id}
        isOpen={isOpen}
        largeCircle={false}
        isNested={true}
      >
        <GenericTaskData
          thread={ thread }
          showDate={ false }
        />
      </Timeline>
      :
      <div key={ thread.id }>
        <GenericTaskData
          thread={ thread }
          showDate={ true }
        />
      </div >
  )
  const currentEvent = caseEvents[0]

  return (
    <>
    { currentEvent ?
      <Timeline
        title={ currentEvent.event_values.description }
        isOpen={ isOpen }
        key={ currentEvent.id }
      >
        { TimelineThread }
      </Timeline>
      :
      <Timeline
        title=""
        canBeOpened={false}
      />
    }
    </>
  )
}

export default Summon
