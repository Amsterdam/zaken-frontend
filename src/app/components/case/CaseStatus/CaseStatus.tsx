import styled from 'styled-components';
import {
  Button, Divider, Heading, themeSpacing,
} from '@amsterdam/asc-ui';

import { Row, Column, RowWithColumn } from 'app/components/layouts/Grid';
import ButtonLink from 'app/components/shared/ButtonLink/ButtonLink';
import to from 'app/routing/utils/to';
import Workflow from '../Workflow/Workflow';

type Props = {
  id: Components.Schemas.Case['id']
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -${themeSpacing(3)};
`;

const StyledDivider = styled(Divider)`
  margin-bottom: ${themeSpacing(8)};
`;

const CaseStatus: React.FC<Props> = ({ id }) => (
  <>
    <Row bottomSpacing={0}>
      <Column spanSmall={50} spanLarge={50}>
        <Heading as="h2">Status</Heading>
      </Column>
      <Column spanSmall={50} spanLarge={50}>
        <ButtonWrap>
          <ButtonLink to={to('/zaken/:id/taak', { id })}>
            <Button as="span" variant="tertiary">Taak opvoeren</Button>
          </ButtonLink>
        </ButtonWrap>
      </Column>
    </Row>
    <RowWithColumn>
      <StyledDivider />
      <Workflow id={id} />
    </RowWithColumn>
  </>
);

export default CaseStatus;
