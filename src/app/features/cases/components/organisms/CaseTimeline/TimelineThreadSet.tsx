import React from "react"
import { StyledAccordion, Dl } from "./CaseTimelineStyle"
import { getDay }from "app/features/shared/components/atoms/DateDay/DateDay"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  title: string
  isOpen?: boolean
  thread: Components.Schemas.CaseTimelineThread
}

type ThreadsetProps = {
  title: string
  isOpen?: boolean
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

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, title, threadSet }) => {
  const accordions = threadSet.map(thread =>
    <StyledAccordion title={ `${ getDay(thread.date, true) } ${ displayDate(thread.date) }` } key={thread.id} isOpen={isOpen} >
      <DefinitionList thread={thread} showDate={false} />
    </StyledAccordion>
  )

  return (
    <StyledAccordion title={title} isOpen={isOpen}>
      { accordions }
    </StyledAccordion>
  )
}

const TimelineBaseSet: React.FC<Props> = ({ title, isOpen, thread }) => (
    <StyledAccordion title={title} isOpen={isOpen}>
      <DefinitionList thread={thread} showDate={true} />
    </StyledAccordion>
  )

export { TimelineBaseSet, TimelineThreadSet }
