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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (authUrl, emailAddress, password) => {

  expect(authUrl, "authUrl was set").to.be.a("string").and.not.be.empty
  expect(emailAddress, "emailAddress was set").to.be.a("string").and.not.be.empty
  expect(password, "password was set").to.be.a("string").and.not.be.empty

  cy.visit(authUrl)

  cy.get("#username")
    .should("be.visible")
    .type(emailAddress)

  cy.get("#password")
    .should("be.visible")
    .type(password)

  cy.get("#kc-login")
    .click()

  cy.wait(1000)

})

Cypress.Commands.add("loginUser", () => (
  cy.login(
    Cypress.env("loginUrl"),
    Cypress.env("defaultUserEmail"),
    process.env.CYPRESS_TEST_USER_PASSWORD
  )
))
