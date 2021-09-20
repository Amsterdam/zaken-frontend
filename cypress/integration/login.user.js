Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("Error ", err)
  return false
})

describe("Try to login", () => {

  it("Login user", () => {
    cy.loginAsPm()

    // Check for Home on landing page.
    cy.get("h1")
      .contains("Home")

  })
})
