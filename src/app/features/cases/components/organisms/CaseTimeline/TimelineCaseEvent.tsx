import React from "react"
import styled from "styled-components"
import {  themeColor, themeSpacing } from "@datapunt/asc-ui"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"

type Props = {
  // title: string
  caseEvent: Components.Schemas.CaseEvent[]
  // isOpen?: boolean
  // isDone?: boolean
  // isEditable?: boolean
  // threadSet: Components.Schemas.CaseTimelineThread[]
  // button?: JSX.Element
}

type DLProps = {
  thread: string//Components.Schemas.CaseTimelineThread
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
    {thread}
  {/* { showDate && thread.date && <div><dt>Datum</dt><dd>{ displayDate(thread.date) }</dd></div> }
  { Object.keys(thread.parameters ?? {}).map((key, index) => (
    <div key={index}>
      <dt>{key}</dt>
      <dd>{ thread.parameters?.[key] }</dd>
    </div>
  ))}
  { thread.notes && <div><dt>Toelichting</dt><dd><i>{ thread.notes }</i></dd></div> } */}
  </Dl>
)

// const ButtonWrap = styled.div`
//   @media ${ breakpoint("min-width", "laptop") } {
//     position: absolute;
//     bottom: 20px;
//     right: 20px;
//   }
// `

const CaseEvent: React.FC<Props> = ({ caseEvent }) => {
  const TimelineThread = caseEvent.map(thread =>
    caseEvent.length > 1 ?
      <Timeline
        title= { `${ getDay(thread.date_created, true) } ${ displayDate(thread.date_created) }` }
        key={thread.id}
        isDone={true}
        largeCircle={false}
        isNested={true}
      >
        <DefinitionList
          thread="TODO"
          showDate={false}
        />
      </Timeline>
      : 
      <DefinitionList key={ thread.id } thread="TODO" showDate={true} />
  )

  return (
        // <div>{ caseEvent[0].type }, aantal: { caseEvent.length }</div>
    
    <Timeline
      title={ caseEvent[0].type }
      isDone={ true }
    >
      { TimelineThread }
      {/* <ButtonWrap>
        { button }
      </ButtonWrap> */}
    </Timeline>
  )
}

export default CaseEvent
