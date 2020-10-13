import { Accordion, AccordionWrapper } from "@datapunt/asc-ui"
import { useCaseTimelines } from "app/state/rest"
import React from "react"
import TimelineStadium from "./TimelineStadium"

type Props = {
  caseId: string | undefined
}
const TimelineContainer: React.FC<Props> = ({ caseId }) => {
  const { data } = useCaseTimelines(caseId!)
  const subject: any = data?.results[0].subject
  const threadSet: Components.Schemas.CaseTimelineThread[] | undefined = data?.results[0].casetimelinethread_set
  
  return (
    <AccordionWrapper>
      <TimelineStadium title={ subject } threadSet={ threadSet }/>
        
      <Accordion title="Aanleiding" id="2" />
        
      
    </AccordionWrapper>
  )
}

export default TimelineContainer
