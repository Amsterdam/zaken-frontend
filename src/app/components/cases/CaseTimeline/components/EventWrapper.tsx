import React from "react"
import type { Field } from "../helpers/fields"
import EventData from "./EventData"

type Props = {
  fields: Field[]
  caseEvent: Components.Schemas.CaseEvent
  isNested?: boolean
}

const EventWrapper: React.FC<Props> = ({ fields, caseEvent: { event_values }, isNested }) => (
  <EventData
    fields={ fields }
    values={ event_values }
    isNested={ isNested }
  />
)

export default EventWrapper
