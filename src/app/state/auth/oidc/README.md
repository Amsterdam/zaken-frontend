# Entra-ID, React, TypeScript

<!-- TODO: CREATE a option for local development -->

## Implement
- Add `` to [App.tsx](https://github.com/Amsterdam/zaken-frontend/blob/main/src/App.tsx)
- Optionally add a `initializedCallback` function

## Local development
- Make sure to set `LOCAL_DEVELOPMENT_AUTHENTICATION=True` in `zaken-backend`
- Run `zaken-backend` locally
- Create an access token at http://localhost:8080/api/v1/swagger/#/. Endpoint POST `/api/v1/oidc-authenticate/` (you can use any string for `code`). This token is valid for 24 hours.
- Add the token (`access` field) to `.env.development.local`. `REACT_APP_API_TOKEN={token}`

## TODO
- Look into SSO (Single Sign On) support
