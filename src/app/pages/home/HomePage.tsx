import { RouteComponentProps } from '@reach/router';

import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import { RowWithColumn } from 'app/components/layouts/Grid';
import PageHeading from 'app/components/shared/PageHeading/PageHeading';
import HomeMenu from 'app/components/home/HomeMenu/HomeMenu';
import SearchWrapper from 'app/components/search/SearchWrapper/SearchWrapper';

const IndexPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <RowWithColumn topSpacing={12}>
      <PageHeading />
    </RowWithColumn>
    <RowWithColumn>
      <HomeMenu />
    </RowWithColumn>
    <SearchWrapper />
  </DefaultLayout>
);

export default IndexPage;
