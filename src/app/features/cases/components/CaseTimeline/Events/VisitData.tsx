import React from "react"
import { displayDate, displayTime } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Dl, DLProps, mapArrayToUl } from "../helpers/Helpers"
import { visitEventValuesMap, visitLabelsMap, visit_go_ahead } from "../helpers/dictionaries"

const VisitData: React.FC<DLProps> = ({ thread, showDate }) => {
  const value = thread.event_values
  return (
    <Dl>
        { showDate && value.start_time && <div><dt>Datum</dt><dd>{ displayDate(value.start_time) }</dd></div> }
        { value.start_time &&
        <div>
            <dt>{ visitLabelsMap["start_time"] }</dt>
            <dd>{ displayTime(value.start_time) }</dd>
        </div>
      }
      { value.authors.length > 0 &&
        <div>
          <dt>{ visitLabelsMap["authors"] }</dt>
          <dd>{ mapArrayToUl(value.authors) }</dd>
        </div>
      }
      { value.situation &&
        <div>
          <dt>{ visitLabelsMap["situation"] }</dt>
          <dd>{ visitEventValuesMap[value.situation] }</dd>
        </div>
      }
      { value.situation && value.situation === "access_granted" &&
        <div>
          <dt>{ visitLabelsMap["notes"] }</dt>
          <dd><i>{ value.notes }</i></dd>
        </div>
      }
      { value.observations.length > 0 && !value.observations.includes("no observations") &&
        <div>
          <dt>{ visitLabelsMap["observations"] }</dt>
          <dd>{ mapArrayToUl(value.observations, true) }</dd>
        </div>
      }
      { value.suggest_next_visit &&
        <div>
            <dt>{ visitLabelsMap["suggest_next_visit"] }</dt>
            <dd>{ visitEventValuesMap[value.suggest_next_visit] }</dd>
        </div>
      }
      { value.suggest_next_visit && value.suggest_next_visit_description &&
        <div>
          <dt>{ visitLabelsMap["suggest_next_visit_description"] }</dt>
          <dd><i>{ value.suggest_next_visit_description }</i></dd>
        </div>
      }
      { value.can_next_visit_go_ahead && value.situation !== "access_granted" &&
        <div>
            <dt>{ visitLabelsMap["can_next_visit_go_ahead"] }</dt>
            <dd>{ visit_go_ahead[value.can_next_visit_go_ahead as string] }</dd>
        </div>
      }
      { value.can_next_visit_go_ahead && value.can_next_visit_go_ahead_description &&
        <div>
          <dt>{ visitLabelsMap["can_next_visit_go_ahead_description"] }</dt>
          <dd><i>{ value.can_next_visit_go_ahead_description }</i></dd>
        </div>
      }
    </Dl>
  )
}

  export default VisitData
