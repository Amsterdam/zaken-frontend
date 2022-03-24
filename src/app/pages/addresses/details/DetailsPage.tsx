import { RouteComponentProps } from '@reach/router';

import isValidUrlParamBAGId from 'app/routing/utils/isValidUrlParamBAGId';
import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import Row from 'app/components/layouts/Grid/Row';
import Column from 'app/components/layouts/Grid/Column';
import DetailHeader from 'app/components/shared/DetailHeader/DetailHeader';
import PageHeading from 'app/components/shared/PageHeading/PageHeading';
import ObjectDetails from 'app/components/addresses/ObjectDetails/ObjectDetails';
import PermitOverview from 'app/components/permits/PermitOverview/PermitOverview';
import NotFoundPage from 'app/pages/errors/NotFoundPage';
import Advertisements from 'app/components/addresses/Advertisements/Advertisements';

type Props = {
  bagId: string
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ? (
    <DefaultLayout>
      <Row>
        <Column spanLarge={50}>
          <PageHeading />
        </Column>
        <Column spanLarge={50}>
          <DetailHeader bagId={bagId} />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <ObjectDetails bagId={bagId} />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <Advertisements bagId={bagId} />
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <PermitOverview bagId={bagId} />
        </Column>
      </Row>
    </DefaultLayout>
  ) : <NotFoundPage />
);

export default DetailsPage;
