Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("Error ", err)
  return false
})

describe("Try to login", () => {

  it("Login user", () => {
    cy.loginUser()

    // Check for AZA page
    cy.get("a")
      .contains("Amsterdamse Zaak Administratie")

  })
})
