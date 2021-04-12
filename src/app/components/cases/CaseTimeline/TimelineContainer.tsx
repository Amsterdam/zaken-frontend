import { FC } from "react"

import useGroupedCaseEvents from "./hooks/useGroupedCaseEvents"
import { TimelineEvents } from "@amsterdam/wonen-ui"
import { Spinner, ErrorMessage } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const TimelineContainer: FC<Props> = ({ caseId }) => {

  const [timelineEvents, { hasErrors }] = useGroupedCaseEvents(caseId)
  const showEmpty = timelineEvents?.length === 0

  return (
    <>
    { hasErrors ?
      <ErrorMessage message="Laden van tijdlijn evenementen mislukt" /> :
      <>
          { timelineEvents === undefined ?
              <Spinner /> :
              <TimelineEvents items={ timelineEvents } spacingHorizontal={12}/>
          }
        </>
      }
      { showEmpty &&
        <p>Geen tijdlijn evenementen beschikbaar</p>
      }
    </>
  )
}

export default TimelineContainer
