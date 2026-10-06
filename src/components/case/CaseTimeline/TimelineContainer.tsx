import { Alert, Paragraph, Skeleton } from "@amsterdam/design-system-react"
import { useCaseEvents } from "@/api/hooks"
import { CaseEventTimeline } from "@/components/CaseEventTimeline/CaseEventTimeline"

type Props = {
  caseId: components["schemas"]["CaseEvent"]["id"]
  /** False while it is not known yet whether you may see the case: nothing is fetched. */
  enabled?: boolean
}

/**
 * The history of a case: what happened, latest first (the timeline of
 * top-frontend-v2).
 */
const TimelineContainer: React.FC<Props> = ({ caseId, enabled = true }) => {
  const { data: events, isError } = useCaseEvents(caseId, { enabled })

  if (isError) {
    return (
      <Alert heading="Niet gelukt" headingLevel={3} severity="error">
        <Paragraph>De zaakhistorie kon niet worden opgehaald.</Paragraph>
      </Alert>
    )
  }
  if (events === undefined) {
    return (
      <Skeleton>
        <Skeleton.Heading />
        <Skeleton.Paragraph lines={4} />
      </Skeleton>
    )
  }
  if (events.length === 0) {
    return <Paragraph>Er is nog geen zaakhistorie.</Paragraph>
  }

  // The API schema leaves the values of an event open; the timeline knows them per type.
  return <CaseEventTimeline data={events as unknown as CaseEvent[]} />
}

export default TimelineContainer
