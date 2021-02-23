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
- `npm run form-scaffolds:generate`
- `npm run start`

### Bypassing authentication
- When running zaken-frontend and zaken-backend locally, it's possible to bypass Keycloak authentication. See https://github.com/Amsterdam/zaken-frontend/tree/master/src/app/state/auth/keycloak.

### Required access to services for development
- ADW account (email@amsterdam.nl)
- GitHub repository (https://github.com/Amsterdam/zaken-frontend) OIS Basis
- Jenkins (https://ci.secure.amsterdam.nl/job/fixxx/job/zaken-frontend/) (over VPN) OIS Basis
- Sentry (https://sentry.data.amsterdam.nl/sentry/zaken-frontend/) OIS Basis
- NPM (https://npmjs.com/amsterdam) OIS Slack #frontend-amsterdam

### Connecting to Acceptance API
- It's possible to connect a locally run zaken-frontend to Acceptance API. Add `REACT_APP_API_HOST=https://acc.api.wonen.zaken.amsterdam.nl/api/v1/` to `.env.development.local`. See [.env.development](https://github.com/Amsterdam/zaken-frontend/blob/master/.env.development) for examples.

# Original README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
