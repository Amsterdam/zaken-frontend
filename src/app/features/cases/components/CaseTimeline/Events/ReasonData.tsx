import React from "react"
import { Dl, DLProps } from "../helpers/Helpers"
import { reasonLabelsMap } from "../helpers/dictionaries"

const fields = ["start_date", "author", "reason", "description"]

const ReasonData: React.FC<DLProps> = ({ thread }) => (
  <Dl>
    { fields.map(field => (
      <div>
        <dt>{ reasonLabelsMap[field] }</dt>
        <dd>{ thread.event_values[field] }</dd>
      </div>
    )) }
  </Dl>
)

export default ReasonData
