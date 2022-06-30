import address from "../../fixtures/address.json"

describe('Select Next Step - closing case as toezichthouder', () => {

  it("Login as toezichthouder", () => {
    cy.loginAsTh()
  })

  it("Go to Adresoverzicht and check address", () => {
    const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
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

  it("Toezichthouder should not be able to close the case", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/`

    cy.request({
      method: 'GET',
      url: url,
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(401)
    })
  })
})