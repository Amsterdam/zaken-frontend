import React from "react"
import { Dl, DLProps } from "../helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { genericLabelsMap } from "../helpers/dictionaries"

const SummonData: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
      { showDate && value.date_added && <div><dt>Datum</dt><dd>{ displayDate(value.date_added) }</dd></div> }
      <div>
        <dt>{ genericLabelsMap["author"] }</dt>
        <dd>{ value.author }</dd>
      </div>
    </Dl>
  )
}

  export default SummonData
