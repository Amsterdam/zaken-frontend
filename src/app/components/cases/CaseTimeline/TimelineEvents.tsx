import React from "react"
import TimelineEvent, { TimelineEventItem } from "./TimelineEvent"

type Props = {
  items: TimelineEventItem[]
}

const TimelineEvents: React.FC<Props> = ({ items }) => (
  <>
  { items.map(item =>
    <TimelineEvent
      key={ item.index }
      timelineEventItem={ item }
    />)
  }
  </>
)

export default TimelineEvents