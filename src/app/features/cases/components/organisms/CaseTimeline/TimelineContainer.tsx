import React from "react"
import styled from "styled-components"
import { Timeline, TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import CaseEvent from "./TimelineCaseEvent"
import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
  //type: Components.Schemas.TypeEnum
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
  const { data } = useCaseEvents(caseId!)
  const { shouldCreateDebriefing: showCreateDebriefingLink } = workflow(data)

  const debriefEvents = data?.filter(({ type })  => type === "DEBRIEFING")
  const visitEvents = data?.filter(({ type })  => type === "VISIT")
  const reasonEvents = data?.filter(({ type })  => type === "CASE")

  return (
    <>
      <Div>
        { showCreateDebriefingLink &&
          <TimelineWrapper >
            <Timeline
              title= { "Debrief" }
              isDone={false}
              canBeOpened={false}
            />
          </TimelineWrapper>
        }
        { debriefEvents && debriefEvents.length > 0 &&
            <TimelineWrapper >
              <CaseEvent
                caseEvents={ debriefEvents }
              />
            </TimelineWrapper>
          }
          { visitEvents && visitEvents.length > 0 &&
            <TimelineWrapper >
              <CaseEvent
                caseEvents={ visitEvents } />
            </TimelineWrapper>
          }
          { reasonEvents && reasonEvents.length > 0 &&
            <TimelineWrapper >
              <CaseEvent
                caseEvents={ reasonEvents } />
            </TimelineWrapper>
          }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
