import React from "react"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import Summon from "./Events/Summon"
import GenericTask from "./Events/GenericTask"

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
        <Reason
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
        <Summon
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      type === "GENERIC_TASK" ?
        <GenericTask
          caseEvents={ caseEvents }
          isOpen={ isOpen }
        /> :
      null
    }
  </>
)

export default TimelineEvent
