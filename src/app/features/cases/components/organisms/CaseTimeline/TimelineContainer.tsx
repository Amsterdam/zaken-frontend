import { AccordionWrapper } from "@datapunt/asc-ui"
import { useCaseTimelines } from "app/state/rest"
import React from "react"
import TimelineStadium from "./TimelineStadium"

type Props = {
  caseId: string | undefined
}

const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimelines(caseId!)
  
  const accordionWrapper = data?.results.map((result) => 
    <AccordionWrapper>
      <TimelineStadium title={`${ result.subject ?? "" } (${ result.casetimelinethread_set?.length })`} threadSet={ result.casetimelinethread_set ?? [] }/>
    </AccordionWrapper>
  )

  return (
    <div>
      { accordionWrapper }
    </div>
  )
}

export default TimelineContainer
