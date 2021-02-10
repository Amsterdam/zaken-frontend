import React from "react"
import styled from "styled-components"
import { Button, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"

type Props = {
  id: Components.Schemas.Case["id"]
}

const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  color: ${ themeColor("tint", "level0") };
  margin-left: ${ themeSpacing(2) };
`

const CaseStatus: React.FC<Props> = ({ id }) => (
  <Heading as="h2">
    Status
    <div>
      <ButtonLink to={ to("/zaken/:id/correspondentie", { id }) }>
        <StyledButton variant="tertiary">Correspondentie</StyledButton>
      </ButtonLink>
      <ButtonLink to={ to("/zaken/:id/afronden", { id }) }>
        <StyledButton variant="tertiary">Afronden</StyledButton>
      </ButtonLink>
    </div>
  </Heading>
)

export default CaseStatus