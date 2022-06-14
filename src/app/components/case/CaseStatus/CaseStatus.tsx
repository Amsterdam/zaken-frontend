
import styled from "styled-components"
import { Button, Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import Workflow from "../Workflow/Workflow"
import { Row, Column, RowWithColumn } from "app/components/layouts/Grid"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
  workflows: Components.Schemas.CaseDetail["workflows"]
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -${ themeSpacing(3) };
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(8) };
`

const CaseStatus: React.FC<Props> = ({ id, workflows }) => (
  <>
    <Row bottomSpacing={ 0 }>
      <Column spanSmall={ 50 } spanLarge={ 50 }>
        <Heading as="h2">Open taken</Heading>
      </Column>
      <Column spanSmall={ 50 } spanLarge={ 50 }>
        <ButtonWrap>
          <ButtonLink to={ to("/zaken/:id/taak", { id }) }>
            <Button as="span" variant="tertiary">Taak opvoeren</Button>
          </ButtonLink>
        </ButtonWrap>
      </Column>
    </Row>
    <RowWithColumn>
      <StyledDivider />
      <Workflow workflows={ workflows } />
    </RowWithColumn>
  </>
)


export default CaseStatus