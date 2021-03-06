import React from "react"
import TimelineEventItemComponent from "./TimelineEventItem"
import { debriefLabelsMap, genericLabelsMap, reasonLabelsMap, summonLabelsMap, visitLabelsMap } from "../helpers/dictionaries"
import fields from "../helpers/fields"
import reasonFields from "../events/reasonFields"
import genericTaskFields from "../events/genericTaskFields"
import summonFields from "../events/summonFields"
import debriefingFields from "../events/debriefingFields"
import visitFields from "../events/visitFields"
import { caseTypesMap } from "../helpers/dictionaries"

export type TimelineEventItem = {
  type: string
  caseEvents: Components.Schemas.CaseEvent[]
}

type Props = {
  timelineEventItem: TimelineEventItem
  isOpen?: boolean
}

const TimelineEvent: React.FC<Props> = ({ timelineEventItem: { type, caseEvents }, isOpen = false }) => (
  <>
    { type === "CASE" ?
        <TimelineEventItemComponent
          fields={ fields(reasonFields, reasonLabelsMap) }
          caseEvents={ caseEvents }
          title={ caseTypesMap[type] }
          isOpen={ isOpen }
        /> :
      type === "VISIT" ?
        <TimelineEventItemComponent
          fields={ fields(visitFields, visitLabelsMap) }
          caseEvents={ caseEvents }
          title={ caseTypesMap[type] }
          dateField="start_time"
          isOpen={ isOpen }
        /> :
      type === "DEBRIEFING" ?
        <TimelineEventItemComponent
          fields={ fields(debriefingFields, debriefLabelsMap) }
          caseEvents={ caseEvents }
          title={ caseTypesMap[type] }
          isOpen={ isOpen }
          pathName="debriefing"
        /> :
      type === "SUMMON" ?
        <TimelineEventItemComponent
          fields={ fields(summonFields, summonLabelsMap) }
          caseEvents={ caseEvents }
          title={ caseTypesMap[type] }
          dateField="date_added"
          isOpen={ isOpen }
        /> :
      type === "GENERIC_TASK" ?
        <TimelineEventItemComponent
          fields={ fields(genericTaskFields, genericLabelsMap) }
          caseEvents={ caseEvents }
          title={ caseEvents[0]?.event_values.description }
          dateField="date"
          isOpen={ isOpen }
        /> :
      null
    }
  </>
)

export default TimelineEvent
