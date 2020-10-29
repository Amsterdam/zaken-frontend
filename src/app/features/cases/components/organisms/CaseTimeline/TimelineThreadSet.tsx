import React from "react"
import styled from "styled-components"
import { breakpoint, Button, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { EditDocument } from "@datapunt/asc-assets"
import { getDay }from "app/features/shared/components/atoms/DayDisplay/DayDisplay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import { Timeline } from "app/features/shared/components/molecules/Timeline"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"


type Props = {
  title: string
  caseId: number
  isOpen?: boolean
  isDone?: boolean
  isEditable?: boolean
  thread: Components.Schemas.CaseTimelineThread
}

type ThreadsetProps = {
  title: string
  isOpen?: boolean
  isDone?: boolean
  threadSet: Components.Schemas.CaseTimelineThread[]
}

type DLProps = {
  thread: Components.Schemas.CaseTimelineThread
  showDate: boolean
}

const StyledButton = styled(Button)`
  background-color: transparent;
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`

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

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, isDone, title, threadSet }) => { //nested item
  const Timelines = threadSet.map(thread =>
    <Timeline 
      title={ `${ getDay(thread.date, true) } ${ displayDate(thread.date) }` } 
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
  )

  return (
    <Timeline 
      title={title} 
      isOpen={isOpen} 
      isDone={ isDone }
    >
      { Timelines }
    </Timeline>
  )
}

const TimelineBaseSet: React.FC<Props> = ({ title, caseId, isOpen,  isDone, thread, isEditable }) => (
    <Timeline 
      title={title} 
      isOpen={isOpen} 
      isDone={ isDone } 
    >
      <DefinitionList thread={thread} showDate={true} />

      { (isEditable && caseId) && 
        // TODO: get and use debrief id like "/cases/:caseId/debriefing/:id", { caseId, id }
        <ButtonLink to={ to("/cases/:caseId/debriefing", { caseId })}>
          <StyledButton size={60} variant="blank" iconSize={32} icon={<EditDocument />} />
        </ButtonLink> }
    </Timeline>
  )

export { TimelineBaseSet, TimelineThreadSet }
