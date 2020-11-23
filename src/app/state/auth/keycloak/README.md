# Keycloak, React, TypeScript

## Implement
- Add `<script src="https://iam.amsterdam.nl/auth/js/keycloak.js"></script>` to [index.html](https://github.com/Amsterdam/zaken-frontend/blob/master/public/index.html)
- Add `KeycloakProvider` to [App.tsx](https://github.com/Amsterdam/zaken-frontend/blob/master/src/App.tsx)
- Optionaly add a `initializedCallback` function
- Use `useKeycloak` hook in your components

## TODO
- Look into SSI (Single Signon) support
- IE11 bug
