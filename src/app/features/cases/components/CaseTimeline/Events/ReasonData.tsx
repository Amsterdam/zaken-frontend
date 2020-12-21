import React from "react"
import { Dl, DLProps } from "../helpers/Helpers"
import { reasonLabelsMap } from "../helpers/dictionaries"

const ReasonData: React.FC<DLProps> = ({ thread }) => (
    <Dl>
      <div>
        <dt>{ reasonLabelsMap.reason }</dt>
        <dd>{ thread.event_values.reason }</dd>
      </div>
    </Dl>
  )

  export default ReasonData
