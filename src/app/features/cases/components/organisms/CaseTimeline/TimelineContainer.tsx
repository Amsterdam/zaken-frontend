import {  AccordionWrapper, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { useCaseTimeline } from "app/state/rest"
import React from "react"
import styled from "styled-components"
import { TimelineThreadSet, TimelineBaseSet } from "./TimelineThreadSet"

type Props = {
  caseId: Components.Schemas.Case["id"] 
}

const Div = styled.div`
  background-color: ${ themeColor("tint", "level2") };
  position: relative;

  >div[role="button"]:not(:last-child) {
    position: relative;
    border-bottom: ${ themeSpacing(5) } solid ${ themeColor("tint", "level1") };
    &:before {
      content: "";
      width: 2px;
      height: 100%;
      position: absolute;
      left: ${ themeSpacing(5.5) };
      top: 30px;
      background-color: ${ themeColor("tint", "level4") };
    }

    @media screen and ${ breakpoint("min-width", "laptop") } {
        &:before {
          left: ${ themeSpacing(11) };
        }
      }
    }


`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimeline(caseId!)

  return (
    <>
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
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
