// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


/**
 * Performs a API request to start again with a clean slate
 */
Cypress.Commands.add("cleanDatabase", () => {
  cy.log("Cleaning database and generating mock data...")

  return cy
    .request("POST", `${ Cypress.env("CYPRESS_BACKEND_HOST") }/api/v1/oidc-authenticate/`, { code: "dummy-code" })
    .then(response => {
      const bearer = response.body.access
      window.localStorage.setItem("zaken-authtoken", bearer)
      return cy.request({
        url: `${ Cypress.env("CYPRESS_BACKEND_HOST") }/api/v1/generate-mock`,
        auth: { bearer }
      })
    })
})

/**
 * Auto fills form elements
 */
Cypress.Commands.add("autoFill", (values: Record<string, string>) => {
  cy.log("Starting autofill:")
  cy.log(JSON.stringify(values, null, 2))
  Object
    .entries(values)
    .forEach(([key, value]) => {
      cy.get(`[data-e2e-id="${ key }"]`).then((el) => {
        const tagName = el.prop("tagName")?.toUpperCase()
        // TODO implement checkboxes and radio-buttons
        switch (tagName) {
          case "INPUT":
            cy.get(`#${ key }`)
              .clear()
              .type(value)
            break
          case "SELECT":
            cy.get(`#${ key }`).select(value)
            break
          default:
            expect(tagName).to.be.oneOf(["SELECT", "INPUT"])
            break
        }
      })
    })
})

/**
 * Fetches a submitButton
 */
Cypress.Commands.add("getSubmitButton", () => cy.get("[data-e2e-id=\"submit\"]"))

/**
 * Directly posts something to the backend
 */
Cypress.Commands.add("postToAPI", (path: string, body: {}) =>
  cy.request({
    method: "POST",
    url: `${ Cypress.env("CYPRESS_BACKEND_HOST") }/api/v1/${ path }`,
    auth: { bearer: window.localStorage.getItem("zaken-authtoken") },
    body
  }))

export default {}
