import React from "react"
import { Dl, DLProps, mapArrayToUl } from "../helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import { summonLabelsMap } from "../helpers/dictionaries"

const SummonData: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
      { showDate && value.date_added && <div><dt>Datum</dt><dd>{ displayDate(value.date_added) }</dd></div> }
      <div>
        <dt>{ summonLabelsMap["author"] }</dt>
        <dd>{ value.author }</dd>
      </div>
      <div>
        <dt>{ summonLabelsMap["persons"] }</dt>
        <dd>{ value.persons ? mapArrayToUl(value.persons) : "-" }</dd>
      </div>
      <div>
        <dt>{ summonLabelsMap["description"] }</dt>
        <dd><i>{ value.description ? value.description : "-" }</i></dd>
      </div>
    </Dl>
  )
}

  export default SummonData
