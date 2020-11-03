import React from "react"
import styled from "styled-components"
// import { Button } from "@datapunt/asc-ui"
// import { EditDocument } from "@datapunt/asc-assets"
// import { useCaseEvents } from "app/state/rest"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import CaseEvent from "./TimelineCaseEvent"
// import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
// import to from "app/features/shared/routing/to"

type Props = {
  caseId: Components.Schemas.Event["id"]
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

// const StyledButton = styled(Button)`
//   background-color: transparent;
// `
const data = [
  { 
    "id": 0,
    "event_values": {},
    "date_created": "2020-11-02T16:27:27.120Z",
    "type": "DEBRIEFING",
    "emitter_id": 0,
    "case": 0
  },{ 
    "id": 1,
    "event_values": {},
    "date_created": "2020-11-01T16:27:27.120Z",
    "type": "VISIT",
    "emitter_id": 1,
    "case": 1
  },{ 
    "id": 2,
    "event_values": {},
    "date_created": "2020-10-31T16:27:27.120Z",
    "type": "VISIT",
    "emitter_id": 2,
    "case": 2
  }
]

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  //const { data } = useCaseEvents(caseId!)
  

  console.log("data", data)

  const groupedEvents = data.reduce(function (r, a) {
      r[a.type] = r[a.type] || []
      r[a.type].push(a)
      return r
  }, Object.create(null))

  const keys = Object.keys(groupedEvents)
  
  return (
    <>
      <Div>
        {/* { data?.map(({ casetimelinethread_set, subject, is_done }, index) => { */}
        { keys.map(( key: any, index: any ) =>

              <TimelineWrapper key={ index } >
                <CaseEvent 
                  caseEvent={ groupedEvents[key] } />
              </TimelineWrapper>
           
          )  
        }
        {/* { groupedEvents?.map(({ id, event_values, date_created, type, emitter_id, case }, index) => {
        const threadCountString = casetimelinethread_set.length > 1 ? `( ${ casetimelinethread_set.length })` : ""
        return (
          <TimelineWrapper key={ index } >
            <TimelineCaseEvent
              title={`${ type ?? "" } ${ threadCountString }`}
              threadSet={ casetimelinethread_set ?? [] }
              isOpen={ !is_done }
              isDone={ is_done }
              caseId={ caseId }
              button={
                subject === "Debriefing" ?
                  <ButtonLink to={ to("/cases/:caseId/debriefing/:id", { caseId, id: casetimelinethread_set[0].id })}>
                    <StyledButton size={60} variant="blank" iconSize={32} icon={<EditDocument />} />
                  </ButtonLink> :
                  undefined
              }
            />
          </TimelineWrapper>  
        )
        })
      } */}
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
