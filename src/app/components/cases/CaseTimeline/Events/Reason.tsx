import React from "react"
import { getDay }from "app/components/shared/components/atoms/DayDisplay/DayDisplay"

import { Timeline } from "app/components/shared/components/molecules/Timeline"
import { mapCaseType } from "../helpers/Helpers"
import ButtonEditEvent from "./ButtonEditEvent"
import ReasonData from "./ReasonData"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}

const Reason: React.FC<Props> = ({ caseEvents, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_created ? `${ getDay(thread.event_values.date_created, true) }` : `${ mapCaseType(thread.type) }` }
        key={thread.id}
        isOpen={isOpen}
        largeCircle={false}
        isNested={true}
      >
        <ReasonData
          thread={ thread }
          showDate={false}
        />
        { thread.emitter_is_editable_until && <ButtonEditEvent target={ `/zaken/${ thread.case }/case/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} /> }
      </Timeline>
      :
      <div key={ thread.id }>
        <ReasonData
          thread={ thread }
          showDate={true}
        />
        { thread.emitter_is_editable_until && <ButtonEditEvent target={ `/zaken/${ thread.case }/case/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} /> }
      </div>
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""

  return (
    <>
    { currentEvent ?
      <Timeline
        title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
      >
        { TimelineThread }
      </Timeline>
    :
      <Timeline
        title="Aanleiding ontbreekt"
        canBeOpened={false}
      />
    }
    </>
  )
}

export default Reason
