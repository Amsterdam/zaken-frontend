import { AccordionWrapper, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { useCaseTimelines } from "app/state/rest"
import React from "react"
import styled from "styled-components"
import TimelineThreadSet from "./TimelineThreadSet"

type Props = {
  caseId: string | undefined
}

const StyledWrapper = styled(AccordionWrapper)`
  div {
    border: 0;
  }
`

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
  @media screen and ${ breakpoint("min-width", "laptop") } {
    &:before {
      left: ${ themeSpacing(11) };
    }
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimelines(caseId!)
  
  const accordionWrapper = data?.results.map((result, index) => 
    <StyledWrapper key={index}>
      <TimelineThreadSet title={`${ result.subject ?? "" } (${ result.casetimelinethread_set?.length })`} threadSet={ result.casetimelinethread_set ?? [] }/>
    </StyledWrapper>
  )

  return (
    <Div>
      { accordionWrapper }
    </Div>
  )
}

export default TimelineContainer
