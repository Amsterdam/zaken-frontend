import React from "react"
import { Timeline, TimelineWrapper } from "app/features/shared/components/molecules/Timeline"

type Props = {
  title: string
}

const NextStep: React.FC<Props> = ({ title }) =>
  <TimelineWrapper >
    <Timeline
      title= { title }
      isDone={ false }
      canBeOpened={ false }
    />
  </TimelineWrapper>
export default NextStep
