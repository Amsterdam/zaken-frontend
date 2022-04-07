import { Icon } from "@amsterdam/asc-ui"
import { VerifiedUser } from "app/components/shared/Icons"
import { StyledTooltip } from "../layout"

type Props = {
  sensitive: Components.Schemas.Case["sensitive"]
}

const SensitiveCaseIcon: React.FC<Props> = ({ sensitive }) => (
  sensitive ? (
    <StyledTooltip title="Dit betreft een gevoelige zaak">
      <Icon><VerifiedUser /></Icon>
    </StyledTooltip>
  ) : null
)

export default SensitiveCaseIcon
