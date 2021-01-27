import React from "react"
import { Dl, DLProps } from "../helpers/Helpers"
import { reasonLabelsMap } from "../helpers/dictionaries"

const fields = ["start_date", "author", "reason", "description"]

const ReasonData: React.FC<DLProps> = ({ thread }) => (
  <>
    { fields.map(field => (
      <Dl>
        <div>
          <dt>{ reasonLabelsMap[field] }</dt>
          <dd>{ thread.event_values[field] }</dd>
        </div>
      </Dl>
    )) }
  </>
)

export default ReasonData
