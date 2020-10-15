import {  AccordionWrapper, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { useCaseTimelines } from "app/state/rest"
import React from "react"
import styled from "styled-components"
import { TimelineThreadSet, TimelineAccordion } from "./TimelineThreadSet"

type Props = {
  caseId: string | undefined
}

const Div = styled.div`
  background-color: ${ themeColor("tint", "level2") };
  position: relative;
  &:before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    left: ${ themeSpacing(5) };
    top: 0;
    background-color: ${ themeColor("tint", "level4") };
  }
  >div[role="button"]:not(:last-child) {
    border-bottom: ${ themeSpacing(5) } solid ${ themeColor("tint", "level1") };
  }
  @media screen and ${ breakpoint("min-width", "laptop") } {
    &:before {
      left: ${ themeSpacing(11) };
    }
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimelines(caseId!)
  
  const accordionWrapper = data?.results.map((result, index) => 
  <>
    <AccordionWrapper key={index}>
      { result.casetimelinethread_set?.length > 0  
        ? <TimelineThreadSet 
          title={`${ result.subject ?? "" } (${ result.casetimelinethread_set?.length ?? 0 })`} 
          threadSet={ result.casetimelinethread_set ?? [] }
          isOpen={!result.is_done}
        />
        : <TimelineAccordion title={ result.subject ?? "" } isOpen={!result.is_done} />
      }
  </AccordionWrapper>
  </>
  )

  return (
    <Div>
      { accordionWrapper }

      {/* TODO: make dynamic */}
      <TimelineAccordion title={ "Aanleiding" } />
    </Div>
  )
}

export default TimelineContainer
