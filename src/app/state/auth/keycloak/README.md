# Keycloak, React, TypeScript

## Implement
- Add `KeycloakProvider` to [App.tsx](https://github.com/Amsterdam/zaken-frontend/blob/master/src/App.tsx)
- Optionally add a `initializedCallback` function
- Use `useKeycloak` hook in your components

## Local development
- Make sure to set `LOCAL_DEVELOPMENT_AUTHENTICATION=True` in `zaken-backend`
- Run `zaken-backend` locally
- Create an access token at http://localhost:8080/api/v1/swagger/#/. Endpoint POST `/api/v1/oidc-authenticate/` (you can use any string for `code`). This token is valid for 24 hours.
- Add the token (`access` field) to `.env.development.local`. `REACT_APP_API_TOKEN={token}`

## TODO
- Look into SSO (Single Sign On) support
