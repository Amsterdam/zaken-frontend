import React from "react"
import { StyledAccordion, Dl } from "./CaseTimelineStyle"

type Props = {
  title: string
}

type ThreadsetProps = {
  isOpen?: boolean
  title: string
  threadSet: Components.Schemas.CaseTimelineThread[]
}


const dateFormatted = (date: any) => {
  const d = new Date(date)
  return `${ d.getDate() }-${ d.getMonth() + 1 }-${ d.getFullYear() }`
}

const TimelineThreadSet: React.FC<ThreadsetProps> = ({ isOpen, title, threadSet }) => {
  const data = { threadSet }.threadSet
  const accordions = data?.map((thread: Components.Schemas.CaseTimelineThread) => 
    <StyledAccordion title={ dateFormatted(thread.date) } key={thread.id} isOpen={isOpen} >
      <Dl>
      { Object.keys(thread.parameters ?? {}).map((key, index) => (
        <div key={index}>
          <dt>{key}</dt>
          <dd>{ thread?.parameters?.[key as unknown as number] }</dd>
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

const TimelineAccordion: React.FC<Props> = ({ title }) => (
  <StyledAccordion title={title}>
    {/* TODO: make dynamic */}
    <p>Nog geen content</p>
  </StyledAccordion>
)

export { TimelineAccordion, TimelineThreadSet }
