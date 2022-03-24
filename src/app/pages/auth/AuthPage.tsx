import { Heading } from '@amsterdam/asc-ui';

import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import NotAuthorizedAlert from 'app/components/auth/NotAuthorizedAlert/NotAuthorizedAlert';
import KeycloakValues from 'app/components/auth/KeycloakValues/KeycloadValues';

const AuthPage: React.FC = () => (
  <DefaultLayout>
    <Heading as="h2">Keycloak gebruiker</Heading>
    <NotAuthorizedAlert />
    <KeycloakValues />
  </DefaultLayout>
);

export default AuthPage;
