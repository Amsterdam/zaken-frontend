import React from "react"
import { getDay }from "app/components/shared/DayDisplay/DayDisplay"

import { Timeline } from "app/components/shared/Timeline"
import type { Field } from "./events/fields"
import EventWrapper from "./EventWrapper"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

type Props = {
  fields: Field[]
  caseEvents: Components.Schemas.CaseEvent[]
  title?: string
  dateField?: string
  pathName?: string
  isOpen?: boolean
}

const TimelineEventItem: React.FC<Props> = ({ fields, caseEvents, title = "", dateField = "date_created", pathName, isOpen = false }) => {

  // This situation would be considered a problem within the data returned from the API
  if (caseEvents.length === 0) return null

  const hasPluralEvents = caseEvents.length > 1
  const titleWithCounter = `${ title } ${ hasPluralEvents ? `(${ caseEvents.length })` : "" }`

  return (
    <Timeline title={ titleWithCounter } isOpen={ isOpen }>
      { caseEvents.map(caseEvent => (
          <div key={ caseEvent.id }>
          { hasPluralEvents ?
            <Timeline
              title={
                caseEvent.event_values[dateField] ?
                  `${ getDay(caseEvent.event_values[dateField], true) } ${ displayDate(caseEvent.event_values[dateField]) }` :
                  `${ title }`
              }
              isOpen={ isOpen }
              largeCircle={ false }
              isNested={ true }
              >
              <EventWrapper fields={ fields } caseEvent={ caseEvent } pathName={ pathName } isNested={ true } />
            </Timeline> :
            <EventWrapper fields={ fields } caseEvent={ caseEvent } pathName={ pathName } />
          }
          </div>
      ) ) }
    </Timeline>
  )
}

export default TimelineEventItem
