import { Accordion, themeSpacing } from "@datapunt/asc-ui"
import React from "react"
import styled from "styled-components"


type Props = {
  isOpen?: boolean
  title: string
  threadSet: Components.Schemas.CaseTimelineThread[]
}

const StyledAccordion = styled(Accordion)`
  border: 2px solid red;
  padding-left: 50px;

  span {
      margin-left: ${ themeSpacing(5) };
  }
`

// const mappedParams = (params: {}) => {
//   Object.keys(params).map(function(key, index) {
//     <dt>{params}[key]</dt>
//   });

// }

const TimelineStadium: React.FC<Props> = ({ isOpen, title, threadSet }) => {
  const accordions = threadSet.map(thread =>
    <Accordion title={thread.date} key={thread.id}>
      <dl>
        { Object.keys(thread.parameters ?? {}).map((key, index) => (
          <div key={index}>
            <dt>{key}</dt>
            <dd>{ thread.parameters?.[key] as string }</dd>
          </div>
        ))
        }
      </dl>
    </Accordion>
  )


  return (
    <StyledAccordion title={title}>
      { accordions }
      {/* <Accordion title="Woensdag 30-09-2020">
          <dl>
            <dt>Starttijd</dt>
            <dd>13:59</dd>
          </dl>
        </Accordion>
        <Accordion title="Maandag 28-09-2020">
          <dl>
            <dt>Starttijd</dt>
            <dd>14:45</dd>
          </dl>
        </Accordion> */}
    </StyledAccordion>
  )
}

export default TimelineStadium
