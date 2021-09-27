import address from "../../../../fixtures/address.json"

describe("As handhavingsjurist, I cannot create a case", () => {

  it("Login as handhavingsjurist", () => {
    cy.loginAsHhj()
  })

  it("Select first case of address", () => {
    cy.selectFirstCaseByAddressQuery(address.queryString, `${address.street}, ${address.zipCode}`)
  })

  it("Nieuwe zaak aanmaken button is disabled", () => {
    cy.get("button[data-e2e-id=btn_add_case]")
      .should("be.visible")
      .should("be.disabled")
  })
})
