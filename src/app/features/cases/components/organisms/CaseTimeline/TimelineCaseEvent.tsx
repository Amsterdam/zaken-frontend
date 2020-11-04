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
  thread: Components.Schemas.CaseEvent
  showDate: boolean
}
type ButtonDebriefProps = {
  caseId:  number
  debriefId: number
  button?: JSX.Element
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

const ButtonDebrief: React.FC<ButtonDebriefProps> = ({ caseId, debriefId, button }) => 
    <ButtonWrap>
      <ButtonLink to={ to("/cases/:caseId/debriefing/:id", { caseId: caseId , id: debriefId })}>
      { button }
      </ButtonLink>
    </ButtonWrap>

const DefinitionList: React.FC<DLProps> = ({ thread, showDate }) => (
  <Dl>
    
  { showDate && thread.date_created && <div><dt>Datum</dt><dd>{ displayDate(thread.date_created) }</dd></div> }
  {/* TODO { Object.keys(thread.parameters ?? {}).map((key, index) => (
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
          thread={ thread }
          showDate={false}
        />
        { thread.type === "DEBRIEFING" && <ButtonDebrief caseId={ thread.case } debriefId={ thread.id } button={ button } /> }
      </Timeline>
      : 
      <>
        <DefinitionList 
          key={ thread.id }
          thread={ thread }
          showDate={true}
        />
        { thread.type === "DEBRIEFING" && <ButtonDebrief caseId={ thread.case } debriefId={ thread.emitter_id } button={ button } /> }
      </>
  )
  const currentEvent = caseEvents[0]
  const counterString = caseEvents.length > 1 ? `(${ caseEvents.length })` : ""
  
  return (
    <>
    { currentEvent && 
    <Timeline
      title={ `${ mapCaseType(currentEvent.type) } ${ counterString } `}
      isDone={ currentEvent.type === "CASE" }
    >
      { currentEvent.type === "CASE"
        ? <p>{ currentEvent.event_values.reason }</p>
        : TimelineThread
      }
      
    </Timeline>
    }
    </>
  )
}

export default CaseEvent
