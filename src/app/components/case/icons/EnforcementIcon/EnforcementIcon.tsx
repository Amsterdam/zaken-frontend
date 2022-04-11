import { Icon } from "@amsterdam/asc-ui"
import { PanTool } from "app/components/shared/Icons"
import { StyledTooltip } from "../layout"

type Props = {
  show?: boolean
}

const EnforcementIcon: React.FC<Props> = ({ show }) => (
  show ? (
    <StyledTooltip title="Deze zaak heeft een handhavingsverzoek als aanleiding">
      <Icon><PanTool color='error' /></Icon>
    </StyledTooltip>
  ) : null
)

export default EnforcementIcon
