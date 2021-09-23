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

 // Logout
 Cypress.Commands.add("logout", () => {
  cy.get('button[title*="Uitloggen"]').click()

  cy.wait(1000)
  cy.get("#username")
    .should("be.visible")
})

// Login
Cypress.Commands.add("login", (email, password) => {

  expect(email, "email was set").to.be.a("string").and.not.be.empty
  // Throw error when password is missing AND don't show the password in the logs.
  if (typeof password !== "string" || !password) {
    throw new Error("Missing password value, set using TEST_USER_PASSWORD=... in cypress.json")
  }
  
  cy.visit("/")

  /*
   ** Get the body's text and check if it contains Inloggen.
   ** If not, logout() first
   */
  cy.get("body").then(($body) => {
    if (!$body.text().includes("Inloggen")) {
      cy.logout()
    }
  })

  cy.get("#username")
    .should("be.visible")
    .type(email)

  cy.get("#password")
    .should("be.visible")
    .type(password, { log: false })

  cy.get("#kc-login")
    .click()
    cy.wait(500);
    const url = `${Cypress.env("baseUrlAcc")}is-authorized/`
    cy.intercept(url).as('isAuthorized')
    cy.wait(500);
    // Wait for authorization
    cy.wait('@isAuthorized').then(() => {
      cy.get("h1")
        .contains("Home")
    })
})

// Login as handhaver.
Cypress.Commands.add("loginAsHh", () => {
  cy.login(Cypress.env("userHh"), Cypress.env("TEST_USER_PASSWORD"))
})

// Login as handhavingsjurist.
Cypress.Commands.add("loginAsHhj", () => {
  cy.login(Cypress.env("userHhj"), Cypress.env("TEST_USER_PASSWORD"))
})

// Login as projectmedewerker.
Cypress.Commands.add("loginAsPm", () => {
  cy.login(Cypress.env("userPm"), Cypress.env("TEST_USER_PASSWORD"))
})

// Login as toezichthouder.
Cypress.Commands.add("loginAsTh", () => {
  cy.login(Cypress.env("userTh"), Cypress.env("TEST_USER_PASSWORD"))
})

// Check for empty textField
Cypress.Commands.add("checkRequiredField", ( field, validInput="test", errorMessage="Dit veld is verplicht") => {
  cy.get(field)
    .focus()
    .blur()
    .siblings()
    .contains(errorMessage)

  cy.get(field)
    .type(validInput)
    .siblings()
    .should("not.exist")
})

// Check for wrong input
Cypress.Commands.add("checkInvalidInput", ( field, errorMessage, validInput, invalidInput="test") => {
  cy.get(field)
  .type(invalidInput)
    .blur()
    .siblings()
    .contains(errorMessage)

  cy.get(field)
    .clear()
    .type(validInput)
    .siblings()
    .should("not.exist")
})
