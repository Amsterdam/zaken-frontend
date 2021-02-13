import React from "react"
import type { Field } from "./Events/fields"
import EventData from "./EventData"
import ButtonEditEvent from "./ButtonEditEvent"

type Props = {
  fields: Field[]
  caseEvent: Components.Schemas.CaseEvent
}

const EventWrapper: React.FC<Props> = ({ fields, caseEvent: { case: caseId, id, event_values, emitter_id, emitter_is_editable, emitter_is_editable_until } }) => (
  <>
    <EventData
      fields={ fields }
      values={ event_values }
    />
    { emitter_is_editable_until &&
      <ButtonEditEvent
        target={ `/zaken/${ caseId }/case/${ emitter_id }` }
        disabled={ !emitter_is_editable }
        editable_until={ emitter_is_editable_until }
      />
    }
  </>
)

export default EventWrapper
