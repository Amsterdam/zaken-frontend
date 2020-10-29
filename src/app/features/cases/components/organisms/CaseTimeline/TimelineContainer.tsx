import { themeColor } from "@datapunt/asc-ui"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
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
    display: flex;
    border-bottom: 20px solid white;

    &:last-child{
      //hide the thin line in the last timelinecontainer
      >div:nth-child(2){
        >div:first-child{
          &:after{
            display: none;
          }
        }
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
          <TimelineWrapper key={ index }>
            { casetimelinethread_set?.length > 1
              ? <TimelineThreadSet
                title={`${ subject ?? "" } (${ casetimelinethread_set?.length ?? 0 })`}
                threadSet={ casetimelinethread_set ?? [] }
                isOpen={ !is_done }
                isDone={ is_done }
              />
              : <TimelineBaseSet
                title={ subject ?? "" }
                thread={ casetimelinethread_set[0] ?? {} }
                isOpen={ !is_done } 
                caseId={ caseId }
                // TODO: get isEditable from back-end
                isEditable={false}
              />
            }
          </TimelineWrapper>
          
        ) }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
