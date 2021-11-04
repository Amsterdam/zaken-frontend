
import styled from "styled-components"
import { Alert, themeSpacing } from "@amsterdam/asc-ui"
import { useCaseTasks } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const StyledAlert = styled(Alert)`
  margin-bottom: ${ themeSpacing(6) };
`

const CaseNuisanceAlert: React.FC<Props> = ({ caseId }) => {
  const [data] = useCaseTasks(caseId)

  console.log("DATA ALERT =>", data)

  return (
    <StyledAlert level="warning" dismissible>
      LET OP: er zijn 3 meldingen met overlast genoteerd. Voer de taak 'Doorzetten melding overlast' op!
    </StyledAlert>
  )
}

export default CaseNuisanceAlert
