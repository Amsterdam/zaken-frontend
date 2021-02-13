import React from "react"
import TimelineEventItem from "./TimelineEventItem"
import { debriefLabelsMap, genericLabelsMap, reasonLabelsMap, summonLabelsMap, visitLabelsMap } from "./helpers/dictionaries"
import fields from "./Events/fields"
import reasonFields from "./Events/reasonFields"
import genericTaskFields from "./Events/genericTaskFields"
import summonFields from "./Events/summonFields"
import debriefingFields from "./Events/debriefingFields"
import visitFields from "./Events/visitFields"

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
        <TimelineEventItem
          fields={ fields(reasonFields, reasonLabelsMap) }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "VISIT" ?
        <TimelineEventItem
          fields={ fields(visitFields, visitLabelsMap) }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "DEBRIEFING" ?
        <TimelineEventItem
          fields={ fields(debriefingFields, debriefLabelsMap) }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "SUMMON" ?
        <TimelineEventItem
          fields={ fields(summonFields, summonLabelsMap) }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "GENERIC_TASK" ?
        <TimelineEventItem
          fields={ fields(genericTaskFields, genericLabelsMap) }
          caseEvents={ caseEvents }
          dateField="date"
          isOpen={ isOpen }
        /> :
      null
    }
  </>
)

export default TimelineEvent
