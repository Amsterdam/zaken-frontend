import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { Timeline } from "app/components/shared/Timeline"
import { mapCaseType } from "../helpers/Helpers"
import ButtonEditEvent from "./ButtonEditEvent"
import DebriefData from "./DebriefData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}


const Debrief: React.FC<Props> = ({ caseEvents, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_added ? `${ getDay(thread.event_values.date_added, true) } ${ displayDate(thread.event_values.date_added) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isOpen={isOpen}
        largeCircle={false}
        isNested={true}
      >
        <DebriefData
          thread={ thread }
          showDate={ false }
        />
        <ButtonEditEvent target={ `/zaken/${ thread.case }/debriefing/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} />
      </Timeline>
      :
      <div key={ thread.id }>
        <DebriefData
          thread={ thread }
          showDate={ true }
        />
        <ButtonEditEvent target={ `/zaken/${ thread.case }/debriefing/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} />
      </div >
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""

  return (
    <>
    { currentEvent ?
      <Timeline
        title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
        isOpen={ isOpen }
        key={ currentEvent.id }
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
