import {  AccordionWrapper, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { useCaseTimeline } from "app/state/rest"
import React from "react"
import styled from "styled-components"
import { TimelineThreadSet, TimelineBaseSet } from "./TimelineThreadSet"

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
  const { data } = useCaseTimeline(caseId!)

  const accordionWrapper = data?.results.map((result, index) => {
    const numberOfThreadItems = result.casetimelinethread_set?.length

    return (
        <AccordionWrapper key={index}>
          { numberOfThreadItems > 1
            ? <TimelineThreadSet
              title={`${ result.subject ?? "" } (${ numberOfThreadItems ?? 0 })`}
              threadSet={ result.casetimelinethread_set ?? [] }
              isOpen={!result.is_done}
            />
            : <TimelineBaseSet
              title={ result.subject ?? "" }
              thread={ result.casetimelinethread_set[0] ?? {} }
              isOpen={!result.is_done} />
          }
      </AccordionWrapper>
    )
  }
  )

  return (
    <Div>
      { accordionWrapper }
    </Div>
  )
}

export default TimelineContainer
