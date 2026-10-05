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
- `npm run start`

The types of the API are in `src/__generated__/apiSchema.d.ts`. Generate them again after a change in the API with `npm run generate:api-schema:acc` (from acceptance) or `npm run generate:api-schema:local` (from a backend on localhost).

### Stack

- [Vite](https://vite.dev), TypeScript and React 19
- [Amsterdam Design System](https://designsystem.amsterdam) for the components, with CSS Modules for our own styles
- [TanStack Query](https://tanstack.com/query) for the data from the API (`src/api`)
- [react-hook-form](https://react-hook-form.com) with `@amsterdam/ee-ads-rhf` for the forms
- [React Router](https://reactrouter.com) for the routes (`src/router/routes.tsx`)
- [Vitest](https://vitest.dev) and Testing Library for the tests

### Checks

Before every change is merged these must pass:

- `npm run typecheck`
- `npm run lint`
- `npm test`

`npm run format` formats the code with Prettier.

### Required access to services for development

- ADW account (@amsterdam.nl)
- GitHub repository (https://github.com/Amsterdam/zaken-frontend) OIS Basis
- NPM (https://www.npmjs.com/settings/amsterdam/packages) OIS Slack #frontend-amsterdam

### Connecting to Acceptance API

- It's possible to connect a locally run zaken-frontend to Acceptance API. Add `VITE_API_URL=https://acc.api.wonen.zaken.amsterdam.nl/api/v1/` to `.env.development.local`. See [.env.development](https://github.com/Amsterdam/zaken-frontend/blob/main/.env.development) for examples.

## Deployment

The `main` branch is automatically deployed to [acceptance](https://acc.wonen.zaken.amsterdam.nl/).

Tag any branch, but preferably main, with a tag like `v1.0.0` to deploy that specific commit
to [production](https://wonen.zaken.amsterdam.nl/).

A `npm run deploy:prod` convenience script is also available. This also guarantees the versions between the Git tag and NPM (package.json) are in sync.

## Structure

Imports use the `@/` alias for `src/`.

| Folder           | What is in it                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/api`        | The hooks for the API (TanStack Query), the query keys and the fetch with the access token                                                                                              |
| `src/components` | Shared components (`Table`, `FormPage`, `DefaultLayout`, …) and, in the folders with a lowercase name, the components of one part of the app (`case`, `cases`, `addresses`, `tasks`, …) |
| `src/config`     | The environment variables and the sign-in (OIDC)                                                                                                                                        |
| `src/hooks`      | Shared hooks                                                                                                                                                                            |
| `src/pages`      | The pages, one folder per part of the app                                                                                                                                               |
| `src/router`     | The routes, the permissions per route and the title of the browser tab                                                                                                                  |
| `src/shared`     | Functions and constants without React (dates, texts, theme names)                                                                                                                       |
| `src/styles`     | Global styles on top of the design system                                                                                                                                               |
| `src/types`      | Types that are not generated from the API                                                                                                                                               |
