
import styled from "styled-components"
import { Alert, themeSpacing } from "@amsterdam/asc-ui"
import { useCase, useCaseEvents } from "app/state/rest"

const MAX_NUMBER_NUISANCE = 3

type Props = {
  caseId: Components.Schemas.CaseDetail["id"]
}

const StyledAlert = styled(Alert)`
  margin-bottom: ${ themeSpacing(6) };
`

const CaseNuisanceAlert: React.FC<Props> = ({ caseId }) => {
  const [caseData] = useCase(caseId)
  const [caseEvents] = useCaseEvents(caseId)

  const totalNuisance = caseEvents?.reduce((acc, cur) => cur?.event_values?.nuisance_detected ? ++acc : acc, 0)
  const isMaxExceeded = totalNuisance !== undefined && totalNuisance >= MAX_NUMBER_NUISANCE
  const isNuisanceReportedInStates = caseData?.workflows.find((workflow) => workflow.state.name === "Melding overlast")
  const isNuisanceReportedInEvents = caseEvents?.find((event) => event?.event_values?.description === "Doorzetten melding overlast")

  const isVisible = isMaxExceeded && !isNuisanceReportedInStates && !isNuisanceReportedInEvents

  return (
    isVisible ? (
      <StyledAlert level="warning" dismissible>
        {`LET OP: er is ${ MAX_NUMBER_NUISANCE } keer overlast geconstateerd. Voer de taak 'Melding overlast' op!`}
      </StyledAlert>
    ) : null
  )
}

export default CaseNuisanceAlert
