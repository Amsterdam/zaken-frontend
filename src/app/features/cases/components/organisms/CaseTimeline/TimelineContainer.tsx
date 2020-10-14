import { Accordion, AccordionWrapper } from "@datapunt/asc-ui"
import { useCaseTimelines } from "app/state/rest"
import React from "react"
import TimelineStadium from "./TimelineStadium"

type Props = {
  caseId: string | undefined
}
const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimelines(caseId!)

  return (
    <AccordionWrapper>
      <TimelineStadium title={ data?.results[0].subject ?? "" } threadSet={ data?.results[0].casetimelinethread_set ?? [] }/>

      <Accordion title="Aanleiding" id="2" />


    </AccordionWrapper>
  )
}

export default TimelineContainer
