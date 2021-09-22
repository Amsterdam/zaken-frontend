import address from "../../fixtures/address.json"

describe("As toezichthouder, I cannot create a case", () => {

  it("Login as toezichthouder", () => {
    cy.loginAsTh()

    // Check for Home on landing page.
    cy.get("h1")
      .contains("Home")
  })

  it("Select address", () => {
    cy.selectFirstCaseByAddressQuery(address.queryString)
    cy.wait(1000)
  })

  it("Adresoverzicht has right address", () => {
    cy.get("h1")
      .contains(`${address.street}, ${address.zipCode}`)
  })

  it("Nieuwe zaak aanmaken button is disabled", () => {
    cy.get("button[data-e2e-id=btn_add_case]")
      .should("be.visible")
      .should("be.disabled")
  })
})