import React from "react"
import TimelineEvent, { TimelineEventItem } from "./TimelineEvent"
import { TimelineWrapper } from "app/components/shared/Timeline"

type Props = {
  items: TimelineEventItem[]
}

const TimelineEvents: React.FC<Props> = ({ items }) => (
  <>
  { items.map((item, index) => (
    <TimelineWrapper key={ item.eventList[0].id }>
      <TimelineEvent
        timelineEventItem={ item }
        isOpen={ index === 0 }
      />
    </TimelineWrapper>
  )) }
  </>
)

export default TimelineEvents