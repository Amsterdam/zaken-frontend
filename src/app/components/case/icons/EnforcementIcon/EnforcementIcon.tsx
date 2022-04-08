import { Icon } from "@amsterdam/asc-ui"
import { PanTool } from "app/components/shared/Icons"
import { StyledTooltip } from "../layout"

const EnforcementIcon: React.FC = () => (
  <StyledTooltip title="Deze zaak heeft een handhavingsverzoek als aanleiding">
    <Icon><PanTool color='error' /></Icon>
  </StyledTooltip>
)

export default EnforcementIcon
