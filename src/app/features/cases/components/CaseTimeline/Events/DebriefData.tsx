import React from "react"
import { Dl, DLProps } from "../helpers/Helpers"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { debriefViolationMap, debriefLabelsMap } from "../helpers/dictionaries"

const DebriefData: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
      { showDate && value.date_added && <div><dt>Datum</dt><dd>{ displayDate(value.date_added) }</dd></div> }
      <div>
        <dt>{ debriefLabelsMap["author"] }</dt>
        <dd>{ value.author }</dd>
      </div>
      <div>
        <dt>{ debriefLabelsMap["violation"] }</dt>
        <dd>{ value.violation ? debriefViolationMap[value.violation] : "-" }</dd>
      </div>
      <div>
        <dt>{ debriefLabelsMap["feedback"] }</dt>
        <dd><i>{ value.feedback ? value.feedback : "-" }</i></dd>
      </div>
    </Dl>
  )
}

  export default DebriefData
