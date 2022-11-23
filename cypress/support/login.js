// Logout

Cypress.Commands.add("logout", () => {
  cy.get('button[title*="Uitloggen"]').click()
  cy.wait(1000)
  cy.get("#username").should("be.visible")
})

// Login
Cypress.Commands.add("login", (email, password) => {
  expect(email, "email was set").to.be.a("string").and.not.be.empty
  // Throw error when password is missing AND don't show the password in the logs.
  if (!password ||  typeof password !== "string" ) {
    throw new Error("Missing password value, set using TEST_USER_PASSWORD=... in cypress.env.json")
  }

  cy.visit("/")

  /*
   ** In Github action the session token will not be stored so every file
   ** a login is needed. When testing locally the session token is stored.
   ** This method will logout at the beginning of a test so a uniform flow is created.
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

  const url = `${Cypress.env("baseUrlAcc")}is-authorized/`
  cy.intercept(url).as('isAuthorized')

  cy.get("#kc-login")
    .click()

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
