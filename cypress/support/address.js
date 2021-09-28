/*
 ** Search address for cases by queryString.
 ** Select first case.
 ** Check Adresoverzicht for right address
 */
Cypress.Commands.add("selectAddress", (queryString, addressString) => {

  expect(queryString, "queryString was set").to.be.a("string").and.not.be.empty
  expect(addressString, "addressString was set").to.be.a("string").and.not.be.empty

  const urlAddress = `${Cypress.env("baseUrlData")}atlas/search/postcode/*`
  cy.intercept(urlAddress).as("getAddress")

  const urlCases = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
  cy.intercept(urlCases).as("getCases")

  cy.visit(`/?query=${queryString}`)

  cy.wait("@getAddress").then(() => {
    cy.wait(500)
    cy.get("tbody>tr").first()
      .should("be.visible")
      .click()
  })

  cy.wait("@getCases").then(() => {
    cy.get("h1")
      .contains(addressString)
  })
})

Cypress.Commands.add("createCaseForAddress", (queryString, addressString) => {

  cy.selectAddress(queryString, addressString)

  cy.get("span[data-e2e-id=btn_add_case]")
    .click()

})
