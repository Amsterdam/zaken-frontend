import React from "react"
import styled from "styled-components"
// import { Button } from "@datapunt/asc-ui"
// import { EditDocument } from "@datapunt/asc-assets"
import { useCaseEvents } from "app/state/rest"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import CaseEvent from "./TimelineCaseEvent"
// import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
// import to from "app/features/shared/routing/to"

type Props = {
  caseId: Components.Schemas.Event["id"]
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

// const StyledButton = styled(Button)`
//   background-color: transparent;
// `
// const data = [
//   { 
//     "id": 0,
//     "event_values": {},
//     "date_created": "2020-11-02T16:27:27.120Z",
//     "type": "DEBRIEFING",
//     "emitter_id": 0,
//     "case": 0
//   },{ 
//     "id": 1,
//     "event_values": {},
//     "date_created": "2020-11-01T16:27:27.120Z",
//     "type": "VISIT",
//     "emitter_id": 1,
//     "case": 1
//   },{ 
//     "id": 2,
//     "event_values": {},
//     "date_created": "2020-10-31T16:27:27.120Z",
//     "type": "VISIT",
//     "emitter_id": 2,
//     "case": 2
//   },{ 
//     "id": 3,
//     "event_values": {
//       "end_date": null,
//       "reason": "Deze zaak bestond al voor het nieuwe zaaksysteem. Zie BWV voor de aanleiding(en).",
//       "start_date": "2019-10-08"
//     },
//     "date_created": "2020-10-30T16:27:27.120Z",
//     "type": "CASE",
//     "emitter_id": 3,
//     "case": 3
//   }
// ]

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const data = useCaseEvents(caseId!).data

  const groupedEvents = data?.reduce(function (r, caseEvent) {
      r[caseEvent.type] = r[caseEvent.type] || []
      r[caseEvent.type].push(caseEvent)
      return r
  }, {} as Record<string, Components.Schemas.Event[]>)

  const keys = Object.keys(groupedEvents ?? {})
  
  return (
    <>
      <Div>
        
        { keys.map(( key: any, index: any ) => 
          groupedEvents &&
            <TimelineWrapper key={ index } >
              <CaseEvent 
                caseEvent={ groupedEvents[key] } />
            </TimelineWrapper>
          ) 
        }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
