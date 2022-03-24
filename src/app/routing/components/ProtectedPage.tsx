import { RouteComponentProps } from '@reach/router';

import useKeycloak from 'app/state/auth/keycloak/useKeycloak';
import AuthorizedPage from './AuthorizedPage';

type Props = {
  page: React.ComponentType
  permissionNames?: Components.Schemas.PermissionsEnum[]
} & RouteComponentProps

/**
 * The user needs to be logged on to visit this route
 */
const ProtectedPage: React.FC<Props> = (props) => {
  const { token } = useKeycloak();

  if (token === undefined) return null;

  const { page: Page, permissionNames, ...restProps } = props;

  return (
    permissionNames !== undefined
      ? <AuthorizedPage {...props} />
      : <Page {...restProps} />
  );
};

export default ProtectedPage;
