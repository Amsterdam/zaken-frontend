import React from "react"
import { TimelineWrapper } from "app/components/shared/Timeline"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"

export type TimelineEventItem = {
  index: number
  type: string
  eventList: Components.Schemas.CaseEvent[]
}

type Props = {
  timelineEventItem: TimelineEventItem
}

const TimelineEvent: React.FC<Props> = ({ timelineEventItem: { index, type, eventList } }) => (
  <TimelineWrapper key={ eventList[0].id }>
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
      null
    }
  </TimelineWrapper>
)
export default TimelineEvent
