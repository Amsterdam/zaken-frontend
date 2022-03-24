import Keycloak from 'keycloak-js';
import settings from './settings';
import keycloakMock from './keycloak.mock';
import isLocalDevelopment from './isLocalDevelopment';

export const keycloak = process.env.NODE_ENV !== 'test' && isLocalDevelopment === false ? new (Keycloak as any)(settings) : keycloakMock;

if (process.env.NODE_ENV === 'development') {
  (window as any).keycloak = keycloak;
}
