import React from "react"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import Summon from "./Events/Summon"
import GenericTask from "./Events/GenericTask"

export type TimelineEventItem = {
  index: number
  type: string
  eventList: Components.Schemas.CaseEvent[]
}

type Props = {
  timelineEventItem: TimelineEventItem
}

const TimelineEvent: React.FC<Props> = ({ timelineEventItem: { index, type, eventList } }) => (
  <>
    { type === "CASE" ?
        <Reason caseEvents={ eventList } /> :
      type === "VISIT" ?
        <Visit
          caseEvents={ eventList }
          isOpen={ index === 0 }
        /> :
      type === "DEBRIEFING" ?
        <Debrief
          caseEvents={ eventList }
          isOpen={ index === 0 }
        /> :
      type === "SUMMON" ?
        <Summon
          caseEvents={ eventList }
          isOpen={ index === 0 }
      /> :
      type === "GENERIC_TASK" ?
        <GenericTask
          caseEvents={ eventList }
          isOpen={ index === 0 }
      /> :
      null
    }
  </>
)

export default TimelineEvent
