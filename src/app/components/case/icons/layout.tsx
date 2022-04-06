import { themeSpacing } from "@amsterdam/asc-ui"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import styled from "styled-components"

export const StyledTooltip = styled(CustomTooltip)`
  margin-left: ${ themeSpacing(2) };
  margin-top: -${ themeSpacing(1) };
`