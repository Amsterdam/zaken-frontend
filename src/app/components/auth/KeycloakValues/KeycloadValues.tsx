import type KeycloakTokenParsedExtended from 'app/state/auth/keycloak/KeycloakTokenParsedExtended';
import useKeycloak from 'app/state/auth/keycloak/useKeycloak';
import { DefinitionList } from '@amsterdam/wonen-ui';
import useValues from './hooks/useValues';

const KeycloakValues: React.FC = () => {
  const keycloak = useKeycloak();
  const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsedExtended;
  const values = useValues(keycloak, tokenParsed);

  return <DefinitionList data={values} />;
};

export default KeycloakValues;
