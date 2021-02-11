import React from "react"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import Summon from "./Events/Summon"
import GenericTask from "./Events/GenericTask"

export type TimelineEventItem = {
  type: string
  eventList: Components.Schemas.CaseEvent[]
}

type Props = {
  timelineEventItem: TimelineEventItem
  isOpen?: boolean
}

const TimelineEvent: React.FC<Props> = ({ timelineEventItem: { type, eventList }, isOpen = false }) => (
  <>
    { type === "CASE" ?
        <Reason
          caseEvents={ eventList }
          isOpen={ isOpen }
        /> :
      type === "VISIT" ?
        <Visit
          caseEvents={ eventList }
          isOpen={ isOpen }
        /> :
      type === "DEBRIEFING" ?
        <Debrief
          caseEvents={ eventList }
          isOpen={ isOpen }
        /> :
      type === "SUMMON" ?
        <Summon
          caseEvents={ eventList }
          isOpen={ isOpen }
        /> :
      type === "GENERIC_TASK" ?
        <GenericTask
          caseEvents={ eventList }
          isOpen={ isOpen }
        /> :
      null
    }
  </>
)

export default TimelineEvent
