
import React from "react"
import styled from "styled-components"
import { useCaseTimeline } from "app/state/rest"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import TimelineThreadSet from "./TimelineThreadSet"

type Props = {
  caseId: Components.Schemas.Case["id"] 
}

const Div = styled.div`
>div[role="button"] {
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
        { data?.map(({ casetimelinethread_set, subject, is_done }, index) => {
        const threadCountString = casetimelinethread_set.length > 1 ? `( ${ casetimelinethread_set.length })` : ""
        return (
          <TimelineWrapper key={ index } >
            <TimelineThreadSet
              title={`${ subject ?? "" } ${ threadCountString }`}
              threadSet={ casetimelinethread_set ?? [] }
              isOpen={ !is_done }
              isDone={ is_done }
              caseId={ caseId }
            />
          </TimelineWrapper>  
        )
        })
      }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
