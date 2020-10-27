import React from "react"
import { Dl } from "./CaseTimelineStyle"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"

type Props = {
  title: string
  isOpen?: boolean
  active?: boolean
  checked?: boolean
  thread: Components.Schemas.CaseTimelineThread
}

type ThreadsetProps = {
  title: string
  isOpen?: boolean
  active?: boolean
  checked?: boolean
  threadSet: Components.Schemas.CaseTimelineThread[]
}

type DLProps = {
  thread: Components.Schemas.CaseTimelineThread
  showDate: boolean
}

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => (
  <Dl>
  { showDate && thread.date && <div><dt>Datum</dt><dd>{ displayDate(thread.date) }</dd></div> }
  { Object.keys(thread.parameters ?? {}).map((key, index) => (
    <div key={index}>
      <dt>{key}</dt>
      <dd>{ thread.parameters?.[key] }</dd>
    </div>
  ))}
  { thread.notes && <div><dt>Toelichting</dt><dd><i>{ thread.notes }</i></dd></div> }
  </Dl>
)

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, checked, active, title, threadSet }) => {
  const Timelines = threadSet.map(thread =>
    <Timeline 
      title={ `${ getDay(thread.date, true) } ${ displayDate(thread.date) }` } 
      key={thread.id} 
      isOpen={isOpen} 
      checked={ checked }
      largeCircle={false}
      active={false}
    >
      <DefinitionList 
        thread={thread} 
        showDate={false} 
      />
    </Timeline>
  )

  return (
    <Timeline 
      title={title} 
      isOpen={isOpen} 
      checked={ checked }
      active={active}  
    >
      { Timelines }
    </Timeline>
  )
}

const TimelineBaseSet: React.FC<Props> = ({ title, isOpen, active,  checked, thread }) => (
    <Timeline 
      title={title} 
      isOpen={isOpen} 
      checked={ checked } 
      customSize={true}
      active={  active}
    >
      <DefinitionList thread={thread} showDate={true} />
    </Timeline>
  )

export { TimelineBaseSet, TimelineThreadSet }
