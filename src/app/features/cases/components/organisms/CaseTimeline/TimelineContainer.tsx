import React from "react"
import styled from "styled-components"
import { Timeline, TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import { useCaseEvents } from "app/state/rest"
import workflow from "app/state/workflow/workflow"
import Reason from "./Events/Reason"
import Debrief from "./Events/Debrief"
import Visit from "./Events/Visit"
import { mapCaseType } from "./helpers/Helpers"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

type NextStepProp = {
  title: string
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

const NextStep: React.FC<NextStepProp> = ({ title }) => 
  <TimelineWrapper >
    <Timeline
      title= { title }
      isDone={ false }
      canBeOpened={false}
    />
  </TimelineWrapper>

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseEvents(caseId!)
  const { shouldCreateDebriefing, shouldCreateVisit, shouldCreateViolation, shouldCloseCase } = workflow(data, true)
  const { visitIsDone, debriefIsDone } = workflow(data)

  const debriefEvents = data?.filter(({ type })  => type === "DEBRIEFING")
  const visitEvents = data?.filter(({ type })  => type === "VISIT")
  const reasonEvents = data?.filter(({ type })  => type === "CASE")

  return (
    <>
      <Div>
        { shouldCreateDebriefing &&
          <NextStep title={ mapCaseType("DEBRIEFING") } />
        }
        { shouldCreateVisit &&
          <NextStep title={ mapCaseType("VISIT") } />
        }
        { debriefIsDone && shouldCreateViolation &&
          <NextStep title="Overtreding" />
        }
        { debriefIsDone && shouldCloseCase &&
          <NextStep title="Zaak afsluiten" />
        }
        { debriefEvents && debriefEvents.length > 0 &&
            <TimelineWrapper >
              <Debrief
                caseEvents={ debriefEvents }
                isDone={ debriefIsDone }
                isOpen={ !debriefIsDone || (debriefIsDone && (shouldCreateViolation || shouldCloseCase)) }
              />
            </TimelineWrapper>
          }
          { visitEvents && visitEvents.length > 0 &&
            <TimelineWrapper >
              <Visit
                caseEvents={ visitEvents } 
                isDone={ visitIsDone }
                isOpen={ !visitIsDone || (visitIsDone && shouldCreateDebriefing) } />
            </TimelineWrapper>
          }
          { reasonEvents && reasonEvents.length > 0 &&
            <TimelineWrapper >
              <Reason
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
