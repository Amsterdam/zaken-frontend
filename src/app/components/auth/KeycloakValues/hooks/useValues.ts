import type KeycloakTokenParsedExtended from 'app/state/auth/keycloak/KeycloakTokenParsedExtended';
import { KeycloakInstance } from 'keycloak-js';

export default (keycloak?: KeycloakInstance, token?: KeycloakTokenParsedExtended) => {
  if (keycloak === undefined || token === undefined) return;

  const values = [
    ['Naam', token.name],
    ['E-mail', token.email],
    ['Gebruikersnaam', token.preferred_username],
    ['Keycloak groepen', keycloak.realmAccess?.roles.join(', ') ?? '-'],
  ];

  return Object.fromEntries(values);
};
