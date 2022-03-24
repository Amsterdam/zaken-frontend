import { RouteComponentProps } from '@reach/router';
import { Heading } from '@amsterdam/asc-ui';

import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import { RowWithColumn } from 'app/components/layouts/Grid';
import Cases from 'app/components/cases/Cases/Cases';

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn>
      <Heading>Zakenoverzicht</Heading>
    </RowWithColumn>
    <Cases />
  </DefaultLayout>
);

export default IndexPage;
