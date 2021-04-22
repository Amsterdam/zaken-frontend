import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import LockOpen from "@material-ui/icons/LockOpen"

const StyledIcon = styled(Icon)`
  padding-top: ${ themeSpacing(2) };
`

const LockIcon: React.FC = () => (
  <StyledIcon size={ 32 }>
    <LockOpen titleAccess="Openstaande taak" />
  </StyledIcon>
)

export default LockIcon