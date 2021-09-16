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

Cypress.Commands.add("login", (emailAddress, password) => {

  expect(emailAddress, "emailAddress was set").to.be.a("string").and.not.be.empty
  // Throw error when password is missing AND don't show the password in the logs.
  if (typeof password !== 'string' || !password) {
    throw new Error('Missing password value, set using TEST_USER_PASSWORD=... in cypress.json')
  }

  cy.visit('/')

  cy.get("#username")
    .should("be.visible")
    .type(emailAddress)

  cy.get("#password")
    .should("be.visible")
    .type(password, { log: false })

  cy.get("#kc-login")
    .click()

  cy.wait(1000)

})

Cypress.Commands.add("loginAsPm", () => (
  cy.login(
    Cypress.env("emailPm"),
    Cypress.env("TEST_USER_PASSWORD")
  )
))
