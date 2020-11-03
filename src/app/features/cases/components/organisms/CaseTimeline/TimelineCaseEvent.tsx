import React from "react"
import styled from "styled-components"
import {  themeColor, themeSpacing, breakpoint } from "@datapunt/asc-ui"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

type Props = {
  caseEvents: Components.Schemas.CaseEvent[]
  button?: JSX.Element
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

const mapCaseType = (type: Components.Schemas.TypeEnum) => {
  switch (type) {
    case "DEBRIEFING": return "Debrief"
    case "VISIT": return "Huisbezoek(en)"
    case "CASE": return "Aanleiding"
  }
}

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

const ButtonWrap = styled.div`
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`

const CaseEvent: React.FC<Props> = ({ caseEvents, button }) => {
  const TimelineThread = caseEvents.map(thread =>
    caseEvents.length > 1 ?
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
  const currentEvent = caseEvents[0]
  return (
    
    <Timeline
      title={ mapCaseType(currentEvent.type)}
      isDone={ currentEvent.type === "CASE" }
    >
      { currentEvent.type === "CASE"
        ? <p>{ currentEvent.event_values.reason }</p>
        : TimelineThread
      }
      { currentEvent.type === "CASE" &&
        <ButtonWrap>
          <ButtonLink to={ to("/cases/:caseId/debriefing/:id", { caseId: currentEvent.case , id: currentEvent.id })}>
          { button }
          </ButtonLink>
        </ButtonWrap>
      }
    </Timeline>
  )
}

export default CaseEvent
