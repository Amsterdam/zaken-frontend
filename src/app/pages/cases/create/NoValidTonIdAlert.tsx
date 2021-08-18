import styled from "styled-components"
import { Alert, Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"

const StyledAlert = styled(Alert)`
  margin: ${ themeSpacing(12) } 0
`

const NoValidTonIdAlert = ({ isVisible = false }) =>
  isVisible ?
    (
      <StyledAlert level="error" dismissible>
        <Heading forwardedAs="h2">
          Oeps! Er is iets fout gegaan.
        </Heading>
        <Paragraph>
          Geen geldige ID voor TON gevonden!
        </Paragraph>
      </StyledAlert>
    ) : null

export default NoValidTonIdAlert
