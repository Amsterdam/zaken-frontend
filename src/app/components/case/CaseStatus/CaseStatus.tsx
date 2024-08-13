
import styled from "styled-components"
import { Divider, Heading, themeSpacing } from "@amsterdam/asc-ui"

import Workflow from "../Workflow/Workflow"
import { Row, Column, RowWithColumn } from "app/components/layouts/Grid"
import to from "app/routing/utils/to"
import IsAuthorizedButtonLink from "app/components/shared/ButtonLink/IsAuthorizedButtonLink"
import { CAN_PERFORM_TASK } from "app/state/rest/custom/usePermissions/useHasPermission"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -${ themeSpacing(3) };
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${ themeSpacing(8) };
`

const CaseStatus: React.FC<Props> = ({ id }) => (
  <>
    <Row bottomSpacing={ 0 }>
      <Column spanSmall={ 50 } spanLarge={ 50 }>
        <Heading as="h2">Open taken</Heading>
      </Column>
      <Column spanSmall={ 50 } spanLarge={ 50 }>
        <ButtonWrap>
          <IsAuthorizedButtonLink
            permissionNames={ [CAN_PERFORM_TASK] }
            to={ to("/zaken/:id/taak", { id }) }
            text="Taak opvoeren"
            variant="tertiary"
            data-testid="btn_add_extra_task"
          />
        </ButtonWrap>
      </Column>
    </Row>
    <RowWithColumn>
      <StyledDivider />
      <Workflow id={ id } />
    </RowWithColumn>
  </>
)


export default CaseStatus