import address from "../../fixtures/address.json"

describe('Select Next Step - closing case as handhaver', () => {

  it("Logout", () => {
    cy.logout()
  })

  it("Login as handhaver", () => {
    cy.loginAsHh()
  })

  it("Go to Adresoverzicht and check address", () => {
    const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
    cy.intercept(url).as('getCases')
    cy.visit(`/adres/${address.bagId}`)
    cy.wait('@getCases').then(() => {
      cy.get("h1")
        .contains(`${address.street}, ${address.zipCode}`)
    })
  })

  it("Adresoverzicht has right address", () => {
    cy.get("h1")
      .contains(`${address.street}, ${address.zipCode}`)
  })

  it('Get first case with task "Afsluiten zaak"', () => {
    cy.scrollTo(0, 400)
    cy.get("tbody>tr")
      .contains("td", "Afsluiten zaak")
      .click()
  })

  it("Keycloak authorisation error should be visible", () => {
    cy.get("h2")
      .contains("Keycloak gebruiker")
  })
})