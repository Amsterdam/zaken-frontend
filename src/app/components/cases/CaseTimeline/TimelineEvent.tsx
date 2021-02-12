import React from "react"
import TimelineEventItem from "./TimelineEventItem"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import { genericLabelsMap, reasonLabelsMap, summonLabelsMap } from "./helpers/dictionaries"

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
          fields={ ["start_date", "author", "reason", "description"] }
          labelsMap={ reasonLabelsMap }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "VISIT" ?
        <Visit
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "DEBRIEFING" ?
        <Debrief
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "SUMMON" ?
        <TimelineEventItem
          fields={ ["author", "persons", "description"] }
          labelsMap={ summonLabelsMap }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "GENERIC_TASK" ?
        <TimelineEventItem
          fields={ ["author"] }
          labelsMap={ genericLabelsMap }
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      null
    }
  </>
)

export default TimelineEvent
