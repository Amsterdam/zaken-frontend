import React from "react"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"

type Props = {
  title: string
  isOpen?: boolean
  done?: boolean
  thread: Components.Schemas.CaseTimelineThread
}

type ThreadsetProps = {
  title: string
  isOpen?: boolean
  done?: boolean
  threadSet: Components.Schemas.CaseTimelineThread[]
}

type DLProps = {
  thread: Components.Schemas.CaseTimelineThread
  showDate: boolean
}

const Dl = styled.dl`
max-width: 500px;

&:after {
  clear: both;
  content: "";
  display: table;
}

dd, dt {
  width: 50%;
  padding: ${ themeSpacing(1) } 0; 
}
dt {
  float: left;
  clear: both;
  word-wrap: break-word;
  padding-right: ${ themeSpacing(5) }; 
  color: ${ themeColor("tint","level6") }
}
dd {
  margin: 0;
  padding-right: 20px;
  float: right;
  clear: right;
}
`

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

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, done, title, threadSet }) => { //nested item
  const Timelines = threadSet.map(thread =>
    <Timeline 
      title={ `${ getDay(thread.date, true) } ${ displayDate(thread.date) }` } 
      key={thread.id} 
      isOpen={isOpen} 
      done={ done }
      largeCircle={false}
      nested={true}
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
      done={ done }
    >
      { Timelines }
    </Timeline>
  )
}

const TimelineBaseSet: React.FC<Props> = ({ title, isOpen,  done, thread }) => (
    <Timeline 
      title={title} 
      isOpen={isOpen} 
      done={ done } 
    >
      <DefinitionList thread={thread} showDate={true} />
    </Timeline>
  )

export { TimelineBaseSet, TimelineThreadSet }
