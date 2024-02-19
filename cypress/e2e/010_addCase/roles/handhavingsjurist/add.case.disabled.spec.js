import address from "../../../../fixtures/address.json"

describe("As handhavingsjurist, I cannot create a case", () => {

  it("Login as handhavingsjurist", () => {
    cy.loginAsHhj()
  })

  it("Select address", () => {
    cy.selectAddress(address.queryString, `${address.street}, ${address.zipCode}`)
  })

  it("Nieuwe zaak aanmaken button is disabled", () => {
    cy.get("button[data-testid=btn_add_case]")
      .should("be.visible")
      .should("be.disabled")
  })
})
