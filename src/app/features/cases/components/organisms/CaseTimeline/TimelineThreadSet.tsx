

import React from "react"
import { StyledAccordion, Dl } from "./CaseTimelineStyle"

type Props = {
  title: string
  isOpen?: boolean
}

type ThreadsetProps = {
  title: string
  isOpen?: boolean
  threadSet: Components.Schemas.CaseTimelineThread[]
}


const dateFormatted = (date: string) => {
  const d = new Date(date)
  return `${ d.getDate() }-${ d.getMonth() + 1 }-${ d.getFullYear() }`
}

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, title, threadSet }) => {
  const accordions = threadSet.map(thread =>
    <StyledAccordion title={ dateFormatted(thread.date) } key={thread.id} isOpen={isOpen} >
      <Dl>
      { Object.keys(thread.parameters ?? {}).map((key, index) => (
        <div key={index}>
          <dt>{key}</dt>
          <dd>{ thread.parameters?.[key] }</dd>
        </div>
      ))}
      { thread.notes && <div><dt>Toelichting</dt><dd><i>{ thread.notes }</i></dd></div> }
      </Dl>
    </StyledAccordion>
  )

  return (
    <StyledAccordion title={title} isOpen={isOpen}>
      { accordions }
    </StyledAccordion>
  )
}

const TimelineAccordion: React.FC<Props> = ({ title, isOpen }) => (
  <StyledAccordion title={title} isOpen={isOpen}>
    {/* TODO: make dynamic */}
    <p>Nog geen content</p>
  </StyledAccordion>
)

export { TimelineAccordion, TimelineThreadSet }
