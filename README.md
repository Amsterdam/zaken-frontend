# Zaken frontend

## Production
[wonen.zaken.amsterdam.nl](https://wonen.zaken.amsterdam.nl)

## Acceptance
[acc.wonen.zaken.amsterdam.nl](https://acc.wonen.zaken.amsterdam.nl)

## Development
- There is a dependency on https://github.com/Amsterdam/zaken-backend

- `git clone https://github.com/Amsterdam/zaken-frontend.git`
- `cd zaken-frontend`
- `npm install`
- `npm run swagger:generate-schema`
- `npm run start`

### Bypassing authentication
- When running zaken-frontend and zaken-backend locally, it's possible to bypass Keycloak authentication. See https://github.com/Amsterdam/zaken-frontend/tree/main/src/app/state/auth/keycloak.

### Required access to services for development
- ADW account (@amsterdam.nl)
- GitHub repository (https://github.com/Amsterdam/zaken-frontend) OIS Basis
- GitHub repository dependency (https://github.com/Amsterdam/wonen-ui) OIS Basis
- GitHub repository dependency (https://github.com/Amsterdam/amsterdam-react-final-form) OIS Basis
- NPM (https://www.npmjs.com/settings/amsterdam/packages) OIS Slack #frontend-amsterdam

### Connecting to Acceptance API
- It's possible to connect a locally run zaken-frontend to Acceptance API. Add `VITE_API_URL=https://acc.api.wonen.zaken.amsterdam.nl/api/v1/` to `.env.development.local`. See [.env.development](https://github.com/Amsterdam/zaken-frontend/blob/main/.env.development) for examples.

## Deployment

The `main` branch is automatically deployed to [acceptance](https://acc.wonen.zaken.amsterdam.nl/).

Tag any branch, but preferably main, with a tag like `v1.0.0` to deploy that specific commit
to [production](https://wonen.zaken.amsterdam.nl/).

A `npm run deploy:prod` convenience script is also available. This also guarantees the versions between the Git tag and NPM (package.json) are in sync.

## E2E testing with Cypress

[README.md](https://github.com/Amsterdam/zaken-frontend/blob/main/cypress/README.md)
