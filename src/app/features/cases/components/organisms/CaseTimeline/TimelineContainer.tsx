import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import { useCaseTimeline } from "app/state/rest"
import React from "react"
import styled from "styled-components"
import { TimelineThreadSet, TimelineBaseSet } from "./TimelineThreadSet"

type Props = {
  caseId: string | undefined
}

const Div = styled.div`
  
  >div[role="button"] {
    position: relative;
    display: flex;
    border-bottom: 20px solid white;
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
                checked={ is_done }
                active={ !is_done }
              />
              : <TimelineBaseSet
                title={ subject ?? "" }
                thread={ casetimelinethread_set[0] ?? {} }
                isOpen={ !is_done } />
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
