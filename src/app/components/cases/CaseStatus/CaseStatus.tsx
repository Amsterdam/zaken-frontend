import React from "react"
import styled from "styled-components"
import { Button, Divider, Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import { useCaseTasks } from "app/state/rest"
import Workflow from "../Workflow/Workflow"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${ themeSpacing(2) };
`

const StyledButton = styled(Button)`
  color: ${ themeColor("tint", "level0") };
  margin-left: ${ themeSpacing(2) };
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(16) };
`

const CaseStatus: React.FC<Props> = ({ id }) => {

  const [data] = useCaseTasks(id)

  if (data?.length === 0) return <Paragraph>Deze zaak is afgerond.</Paragraph>

  return (
    <>
      <Div>
        <Heading as="h2">
          Status
        </Heading>
        <span>
          <ButtonLink to={ to("/zaken/:id/correspondentie", { id }) }>
            <StyledButton variant="tertiary">Correspondentie</StyledButton>
          </ButtonLink>
          <ButtonLink to={ to("/zaken/:id/afronden", { id }) }>
            <StyledButton variant="tertiary">Afronden</StyledButton>
          </ButtonLink>
        </span>
      </Div>
      <StyledDivider />
      <Workflow id={ id } />
    </>
  )
}

export default CaseStatus