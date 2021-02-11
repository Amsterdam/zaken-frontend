import React from "react"
import { Dl } from "./helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

type Props = {
  values: Record<string, any>
  fields: string[]
  labelsMap: Record<string, string>
  showDate?: boolean
}

const EventData: React.FC<Props> = ({ values, fields, labelsMap, showDate = false }) => (
  <Dl>
    { showDate && values.date_added &&
      <div>
        <dt>Datum</dt>
        <dd>{ displayDate(values.date_added) }</dd>
      </div>
    }
    { fields.map(field => (
      <div key={ field }>
        <dt>{ labelsMap[field] ?? "-" }</dt>
        <dd>{ values[field] ?? "-" }</dd>
      </div>
    )) }
  </Dl>
)

export default EventData