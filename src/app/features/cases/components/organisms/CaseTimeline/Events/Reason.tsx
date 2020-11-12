import React from "react"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import { Dl, DLProps, mapCaseType } from "../helpers/Helpers"
import { reasonLabelsMap } from "../helpers/Dictionaries"
import ButtonEditEvent from "./ButtonEditEvent"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => 
  <Dl>
    { showDate && thread.date_created && <div><dt>Datum</dt><dd>{ displayDate(thread.date_created) }</dd></div> }
    {/* TODO use map here */}
    <div>
      <dt>{ reasonLabelsMap.reason }</dt>
      <dd>{ thread.event_values.reason }</dd>
    </div>
  </Dl>

const Reason: React.FC<Props> = ({ caseEvents, isOpen }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
      <Timeline
        title= { thread.event_values.date_created ? `${ getDay(thread.event_values.date_created, true) }` : `${ mapCaseType(thread.type) }` }
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
        { thread.emitter_is_editable_until && <ButtonEditEvent target={ `/cases/${ thread.case }/case/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} /> }
      </Timeline>
      :
      <>
        <DefinitionList
          key={ thread.id }
          thread={ thread }
          showDate={true}
        />
        { thread.emitter_is_editable_until && <ButtonEditEvent target={ `/cases/${ thread.case }/case/${ thread.emitter_id }` } disabled={!thread.emitter_is_editable} editable_until={thread.emitter_is_editable_until} /> }
      </>  
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""

  return (
    <>
    { currentEvent &&
    <Timeline
      title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
      isDone={ true }
    >
      { TimelineThread }
    </Timeline>
    }
    </>
  )
}

export default Reason
