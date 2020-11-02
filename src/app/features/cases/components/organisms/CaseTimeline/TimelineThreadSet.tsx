import React from "react"
import styled from "styled-components"
import { breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"

type Props = {
  title: string
  caseId: number
  isOpen?: boolean
  isDone?: boolean
  isEditable?: boolean
  threadSet: Components.Schemas.CaseTimelineThread[]
  button?: JSX.Element
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

const ButtonWrap = styled.div`
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`

const TimelineThreadSet: React.FC<Props> = ({ isOpen, isDone, title, threadSet, button }) => {
  const TimelineThread = threadSet.map(thread =>
    threadSet.length > 1 ?
      <Timeline
        title= { `${ getDay(thread.date, true) } ${ displayDate(thread.date) }` }
        key={thread.id}
        isOpen={isOpen}
        isDone={true}
        largeCircle={false}
        isNested={true}
      >
        <DefinitionList
          thread={thread}
          showDate={false}
        />
      </Timeline>
      : <DefinitionList key={ thread.id } thread={thread} showDate={true} />
  )

  return (
    <Timeline
      title={title}
      isOpen={isOpen}
      isDone={ isDone }
    >
      { TimelineThread }
      <ButtonWrap>
        { button }
      </ButtonWrap>
    </Timeline>
  )
}

export default TimelineThreadSet
