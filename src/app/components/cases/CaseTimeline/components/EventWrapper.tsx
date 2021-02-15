import React from "react"
import type { Field } from "../events/fields"
import EventData from "./EventData"
import ButtonEditEvent from "./ButtonEditEvent"

type Props = {
  fields: Field[]
  caseEvent: Components.Schemas.CaseEvent
  isNested?: boolean
  pathName?: string
}

const EventWrapper: React.FC<Props> = ({ fields, caseEvent: { case: caseId, event_values, emitter_id, emitter_is_editable, emitter_is_editable_until }, isNested, pathName }) => (
  <>
    <EventData
      fields={ fields }
      values={ event_values }
      isNested={ isNested }
    />
    { emitter_is_editable_until && pathName !== undefined &&
      <ButtonEditEvent
        target={ `/zaken/${ caseId }/${ pathName }/${ emitter_id }` }
        disabled={ !emitter_is_editable }
        editable_until={ emitter_is_editable_until }
      />
    }
  </>
)

export default EventWrapper
