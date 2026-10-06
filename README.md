# Zaken frontend

## Production

[wonen.zaken.amsterdam.nl](https://wonen.zaken.amsterdam.nl)

## Acceptance

[acc.wonen.zaken.amsterdam.nl](https://acc.wonen.zaken.amsterdam.nl)

## Development

Requires Node.js 22.22 or newer. The app needs the API of [zaken-backend](https://github.com/Amsterdam/zaken-backend): run it locally (on `localhost:8080`) or use the one of acceptance (see below).

- `git clone https://github.com/Amsterdam/zaken-frontend.git`
- `cd zaken-frontend`
- `npm install`
- `npm start`

The app opens on [localhost:2999](http://localhost:2999). You sign in with your ADW account (Entra ID).

The types of the API are in `src/__generated__/apiSchema.d.ts`. Generate them again after a change in the API with `npm run generate:api-schema:acc` (from acceptance) or `npm run generate:api-schema:local` (from a backend on localhost).

### Stack

- [Vite](https://vite.dev), TypeScript and React 19
- [Amsterdam Design System](https://designsystem.amsterdam) for the components, with CSS Modules for our own styles
- [TanStack Query](https://tanstack.com/query) for the data from the API (`src/api`)
- [react-hook-form](https://react-hook-form.com) with `@amsterdam/ee-ads-rhf` for the forms
- [React Router](https://reactrouter.com) for the routes (`src/router/routes.tsx`)
- [Leaflet](https://leafletjs.com) for the map
- [Vitest](https://vitest.dev) and Testing Library for the tests

### Checks

Before every change is merged these must pass:

- `npm run typecheck`
- `npm run lint`
- `npm test`

GitHub Actions runs the lint, the tests and a Docker build on every pull request to `main`.

`npm run format` formats the code with Prettier.

### Required access to services for development

- ADW account (@amsterdam.nl)
- GitHub repository (https://github.com/Amsterdam/zaken-frontend) OIS Basis
- NPM (https://www.npmjs.com/settings/amsterdam/packages) OIS Slack #frontend-amsterdam

### Connecting to Acceptance API

`npm run acc` starts the app locally with the settings of [.env.acceptance](./.env.acceptance), so with the API of acceptance.

To change a single setting, put it in `.env.development.local` (not in Git). See [.env.development](./.env.development) for the settings there are.

## Deployment

The `main` branch is automatically deployed to [acceptance](https://acc.wonen.zaken.amsterdam.nl/).

Tag any branch, but preferably main, with a tag like `v1.0.0` to deploy that specific commit
to [production](https://wonen.zaken.amsterdam.nl/).

The Docker image is the same for every environment. When the container starts, `entrypoint.sh` writes all environment variables that start with `VITE_` to `config/env.js`; the app reads those instead of the `.env` files (`src/config/env.ts`).

## Structure

Imports use the `@/` alias for `src/`.

| Folder           | What is in it                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/api`        | The hooks for the API (TanStack Query), the query keys and the fetch with the access token                                                                                              |
| `src/components` | Shared components (`Table`, `FormPage`, `DefaultLayout`, …) and, in the folders with a lowercase name, the components of one part of the app (`case`, `cases`, `addresses`, `tasks`, …) |
| `src/config`     | The environment variables and the sign-in (OIDC)                                                                                                                                        |
| `src/hooks`      | Shared hooks                                                                                                                                                                            |
| `src/icons`      | Icons that are not in the design system                                                                                                                                                 |
| `src/pages`      | The pages, one folder per part of the app                                                                                                                                               |
| `src/router`     | The routes, the permissions per route and the title of the browser tab                                                                                                                  |
| `src/shared`     | Functions and constants without React (dates, texts, theme names)                                                                                                                       |
| `src/styles`     | Global styles on top of the design system                                                                                                                                               |
| `src/test-utils` | The setup of the tests and helpers for them                                                                                                                                             |
| `src/types`      | Types that are not generated from the API                                                                                                                                               |
| `public`         | The favicons, the web app manifest and the (empty) `config/env.js` the container fills                                                                                                  |
