import React from "react"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import { mapCaseType } from "../helpers/Helpers"
import ButtonEditEvent from "./ButtonEditEvent"
import DebriefData from "./DebriefData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isDone?: boolean
  isOpen?: boolean
}


const Debrief: React.FC<Props> = ({ caseEvents, isDone, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_added ? `${ getDay(thread.event_values.date_added, true) } ${ displayDate(thread.event_values.date_added) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isDone={true}
        isOpen={isOpen}
        largeCircle={false}
        isNested={true}
      >
        <DebriefData
          thread={ thread }
          showDate={ false }
        />
        <ButtonEditEvent target={ `/cases/${ thread.case }/debriefing/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} />
      </Timeline>
      :
      <>
        <DebriefData
          key={ thread.id }
          thread={ thread }
          showDate={ true }
        />
        <ButtonEditEvent target={ `/cases/${ thread.case }/debriefing/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} />
      </>
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""

  return (
    <>
    { currentEvent ?
      <Timeline
        title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
        isDone={ isDone }
        isOpen={ isOpen }
      >
        { TimelineThread }
      </Timeline>
      : 
      <Timeline
        title="Er is geen Debrief"
        canBeOpened={false}
      />
    }
    </>
  )
}

export default Debrief
