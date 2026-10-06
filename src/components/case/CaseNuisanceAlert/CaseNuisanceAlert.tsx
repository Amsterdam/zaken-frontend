import { useState } from "react"
import { Alert, Paragraph } from "@amsterdam/design-system-react"
import { useCaseEvents, useCaseWorkflows } from "@/api/hooks"

const MAX_NUMBER_NUISANCE = 3

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
}

const CaseNuisanceAlert: React.FC<Props> = ({ caseId }) => {
  const [isClosed, setIsClosed] = useState(false)
  const { data: caseEvents } = useCaseEvents(caseId)
  const { data: caseWorkflowData } = useCaseWorkflows(caseId)
  const workflows = caseWorkflowData?.results ?? []

  const totalNuisance = caseEvents?.reduce(
    (acc, cur) =>
      (cur?.event_values as { nuisance_detected?: boolean } | undefined)
        ?.nuisance_detected
        ? acc + 1
        : acc,
    0,
  )
  const isMaxExceeded =
    totalNuisance !== undefined && totalNuisance >= MAX_NUMBER_NUISANCE
  const isNuisanceReportedInStates = workflows.find(
    (workflow) => workflow.state.name === "Melding overlast",
  )
  const isNuisanceReportedInEvents = caseEvents?.find(
    (event) =>
      (event?.event_values as { description?: string } | undefined)
        ?.description === "Doorzetten melding overlast",
  )

  const isVisible =
    isMaxExceeded &&
    !isNuisanceReportedInStates &&
    !isNuisanceReportedInEvents &&
    !isClosed

  return isVisible ? (
    <Alert
      heading={`Let op: er is ${MAX_NUMBER_NUISANCE} keer overlast geconstateerd`}
      headingLevel={2}
      severity="warning"
      closeable
      onClose={() => setIsClosed(true)}
    >
      <Paragraph>Voer de taak "Melding overlast" op.</Paragraph>
    </Alert>
  ) : null
}

export default CaseNuisanceAlert
