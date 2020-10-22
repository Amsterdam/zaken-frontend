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

  return (
    <Div>
      { data?.map(({ casetimelinethread_set, subject, is_done }, index) =>
        <AccordionWrapper key={ index }>
          { casetimelinethread_set?.length > 1
            ? <TimelineThreadSet
              title={`${ subject ?? "" } (${ casetimelinethread_set?.length ?? 0 })`}
              threadSet={ casetimelinethread_set ?? [] }
              isOpen={ !is_done }
            />
            : <TimelineBaseSet
              title={ subject ?? "" }
              thread={ casetimelinethread_set[0] ?? {} }
              isOpen={ !is_done } />
          }
        </AccordionWrapper>
      ) }
    </Div>
  )
}

export default TimelineContainer
