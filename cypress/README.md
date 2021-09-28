# Zaken frontend - Cypress integration

## Local testing
To open the Cypress UI, enter the following command after installing dependencies:

- `npx cypress open` or `npm run cy`

## Run specific tests
- `npm run cy:run -- --spec "cypress/integration/my-spec.js"`

## Global variables

Global Cypress variables can be found in `cypress.json` in the root of the project. You can acces them by using: `Cypress.env("emailPm")`.

## Credentials or secrets

This is a public repo. Passwords or other secrets can be stored as a Github secret in the repo settings. You need admin rights for this.

- Open `/zaken-frontend/.github/workflows/main.yml`
- Add a secret in the Cypress env part and make sure the variable starts with `CYPRESS_`:

```JavaScript
  env:
    CYPRESS_TEST_USER_PASSWORD:  ${{ secrets.CYPRESS_TEST_USER_PASSWORD }}

```
- Variable is accessible by `Cypress.env("TEST_USER_PASSWORD")`

## Local testing

Create a `cypress.env.json` file in the root directory. Add the following code with your secret password:

```
{
  "TEST_USER_PASSWORD": ****
}
```
`TEST_USER_PASSWORD` will be added to the `env` property in the Cypress config.

NOTE: Add `cypress.env.json` to `.gitignore`

## Cypress Dashboard

The Dashboard is a Cypress service that gives you access to tests you've recorded - typically when running Cypress tests from your CI provider.

https://dashboard.cypress.io/

If tests run fine locally, but not in the Github action, you can enable the Dashboard by uncommenting the following lines in the Github `main.yml` of this repo.

```
  # CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
  # GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

AND set `screenshotOnRunFailure` and `video` to `true` in `cypress.json`!

Watch out! Cypress Dashboard is disabled by default due to limitations of our "free" account.