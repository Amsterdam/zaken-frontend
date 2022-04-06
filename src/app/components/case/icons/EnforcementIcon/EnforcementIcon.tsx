import { Icon } from "@amsterdam/asc-ui"
import { PanTool } from "app/components/shared/Icons"
import { StyledTooltip } from "../layout"

type Props = {
  caseReason: Components.Schemas.Case["reason"]
}

const EnforcementIcon: React.FC<Props> = ({ caseReason }) => (
  caseReason.name === "Handhavingsverzoek" ? (
    <StyledTooltip title="Deze zaak heeft een handhavingsverzoek als aanleiding">
      <Icon><PanTool /></Icon>
    </StyledTooltip>
  ) : null
)

export default EnforcementIcon
