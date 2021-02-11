import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"

import { Timeline } from "app/components/shared/Timeline"
import { mapCaseType } from "./helpers/Helpers"
import ButtonEditEvent from "./ButtonEditEvent"
import EventData from "./EventData"

type Props = {
  fields: string[]
  labelsMap: Record<string, string>
  caseEvents: Components.Schemas.CaseEvent[]
  isOpen?: boolean
}

const TimelineEventItem: React.FC<Props> = ({ fields, labelsMap, caseEvents, isOpen }) => {

  // This situation would be considered a problem within the data returned from the API
  if (caseEvents.length === 0) return null

  const hasPluralEvents = caseEvents.length > 1
  const { type } = caseEvents[0]
  const typeLabel = type === "GENERIC_TASK" ? caseEvents[0].event_values.description : mapCaseType(type)
  const title = `${ typeLabel } ${ hasPluralEvents ? `(${ caseEvents.length })` : "" }`

  return (
    <Timeline title={ title }>
      { caseEvents.map(({ case: caseId, id, event_values, emitter_id, emitter_is_editable, emitter_is_editable_until, date_created }) => {
        const eventWrapper = <>
          <EventData
            values={ event_values }
            fields={ fields }
            labelsMap={ labelsMap }
          />
          { emitter_is_editable_until &&
            <ButtonEditEvent
              target={ `/zaken/${ caseId }/case/${ emitter_id }` }
              disabled={ !emitter_is_editable }
              editable_until={ emitter_is_editable_until }
            />
          }
        </>
        return hasPluralEvents ?
          <Timeline
            title= { event_values.date_created ? `${ getDay(event_values.date_created, true) }` : `${ typeLabel }` }
            key={ id }
            isOpen={ isOpen }
            largeCircle={ false }
            isNested={ true }
            >
            { eventWrapper }
          </Timeline> :
          <div key={ id }>
            { eventWrapper }
          </div>
      }) }
    </Timeline>
  )
}

export default TimelineEventItem
