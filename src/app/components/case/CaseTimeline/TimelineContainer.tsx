

import useGroupedCaseEvents from "./hooks/useGroupedCaseEvents"
import { EventsTimeline } from "@amsterdam/wonen-ui"
import { Spinner, ErrorMessage } from "@amsterdam/asc-ui"

type Props = {
  caseId: Components.Schemas.CaseEvent["id"]
}

const TimelineContainer: React.FC<Props> = ({ caseId }) => {

  const [timelineEvents, { hasErrors }] = useGroupedCaseEvents(caseId)
  const showEmpty = timelineEvents?.length === 0

  return (
    <>
    { hasErrors ?
      <ErrorMessage message="Laden van tijdlijn evenementen mislukt" /> :
      <>
        { timelineEvents === undefined ?
          <Spinner /> :
          <EventsTimeline items={ timelineEvents } spacingHorizontal={3} />
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
