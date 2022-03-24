import { RouteComponentProps } from '@reach/router';

import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import { RowWithColumn } from 'app/components/layouts/Grid';
import PageHeading from 'app/components/shared/PageHeading/PageHeading';

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn topSpacing={12}>
      <PageHeading />
    </RowWithColumn>
  </DefaultLayout>
);

export default IndexPage;
