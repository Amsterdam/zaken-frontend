import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"

import { Timeline } from "app/components/shared/Timeline"
import { mapCaseType } from "./helpers/Helpers"
import type { Field } from "./Events/fields"
import EventWrapper from "./EventWrapper"

type Props = {
  fields: Field[]
  caseEvents: Components.Schemas.CaseEvent[]
  dateField?: string
  isOpen?: boolean
}

const TimelineEventItem: React.FC<Props> = ({ fields, caseEvents, dateField = "date_created", isOpen = false }) => {

  // This situation would be considered a problem within the data returned from the API
  if (caseEvents.length === 0) return null

  const hasPluralEvents = caseEvents.length > 1
  const { type } = caseEvents[0]
  const typeLabel = type === "GENERIC_TASK" ? caseEvents[0].event_values.description : mapCaseType(type)
  const title = `${ typeLabel } ${ hasPluralEvents ? `(${ caseEvents.length })` : "" }`

  return (
    <Timeline title={ title }>
      { caseEvents.map(caseEvent => (
          hasPluralEvents ?
            <Timeline
              title={ caseEvent.event_values[dateField] ? `${ getDay(caseEvent.event_values[dateField], true) }` : `${ typeLabel }` }
              key={ caseEvent.id }
              isOpen={ isOpen }
              largeCircle={ false }
              isNested={ true }
              >
              <EventWrapper fields={ fields } caseEvent={ caseEvent } />
            </Timeline> :
            <div key={ caseEvent.id }>
              <EventWrapper fields={ fields } caseEvent={ caseEvent } />
            </div>
          )
      ) }
    </Timeline>
  )
}

export default TimelineEventItem
