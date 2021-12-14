

import styled from "styled-components"
import Tooltip from "@material-ui/core/Tooltip"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { VerifiedUser } from "app/components/shared/Icons"

type Props = {
  sensitive: Components.Schemas.Case["sensitive"]
}

const StyledTooltip = styled(Tooltip)`
  margin-left: ${ themeSpacing(2) };
  margin-top: -${ themeSpacing(1) };
`

const SensitiveCaseIcon: React.FC<Props> = ({ sensitive }) => (
  sensitive ? (
    <StyledTooltip title="Dit betreft een gevoelige zaak">
      <Icon><VerifiedUser /></Icon>
    </StyledTooltip>
  ) : null
)

export default SensitiveCaseIcon
