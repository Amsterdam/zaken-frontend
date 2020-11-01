import React from "react"
import styled from "styled-components"
import { breakpoint, Button } from "@datapunt/asc-ui"
import { EditDocument } from "@datapunt/asc-assets"

import { useCaseTimeline } from "app/state/rest"
import { TimelineWrapper } from "app/features/shared/components/molecules/Timeline"
import { TimelineThreadSet } from "./TimelineThreadSet"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/features/shared/routing/to"

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

const StyledButton = styled(Button)`
  background-color: transparent;
  @media ${ breakpoint("min-width", "laptop") } {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimeline(caseId!)

  return (
    <>
      <Div>
        { data?.map(({ casetimelinethread_set, subject, is_done }, index) =>
          <TimelineWrapper key={ index }>
            <TimelineThreadSet
              title={`${ subject ?? "" } (${ casetimelinethread_set?.length ?? 0 })`}
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
        ) }
      </Div>
      { data?.length === 0 &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
