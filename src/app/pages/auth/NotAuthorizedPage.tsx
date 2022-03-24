import { RouteComponentProps } from '@reach/router';
import { Heading } from '@amsterdam/asc-ui';
import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';

const NotAuthorizedPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <Heading>403</Heading>
    <p>Helaas, u bent niet geautoriseerd om deze pagina te bekijken</p>
  </DefaultLayout>
);

export default NotAuthorizedPage;
