# Keycloak, React, TypeScript

## Implement
- Add `<script src="https://iam.amsterdam.nl/auth/js/keycloak.js"></script>` to [index.html](https://github.com/Amsterdam/zaken-frontend/blob/master/public/index.html)
- Add `KeycloakProvider` to [App.tsx](https://github.com/Amsterdam/zaken-frontend/blob/master/src/App.tsx)
- Optionally add a `initializedCallback` function
- Use `useKeycloak` hook in your components

## Local development
- Make sure to set `LOCAL_DEVELOPMENT_AUTHENTICATION=True` in `zaken-backend`
- Run `zaken-backend` locally
- Create an access token at http://localhost:8080/api/v1/swagger/#/. Endpoint POST `/api/v1/oidc-authenticate/` (you can use any string for `code`).
- Add the token (`access` field) to `.env.development.local`. `REACT_APP_GATEWAY_TOKEN={token}`

## TODO
- Look into SSI (Single Signon) support
- IE11 bug
