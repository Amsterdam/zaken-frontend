/*
 ** Search address for cases by queryString.
 ** Select first case.
 ** Check Adresoverzicht for right address
 */
Cypress.Commands.add("selectFirstCaseByAddressQuery", (queryString, addressString) => {

  expect(queryString, "queryString was set").to.be.a("string").and.not.be.empty
  expect(addressString, "addressString was set").to.be.a("string").and.not.be.empty

  cy.visit(`/?query=${queryString}`)
  cy.wait(3000)

  cy.get("tbody>tr").first()
    .should("be.visible")
    .click()

  cy.wait(3000)

  cy.get("h1")
    .contains(addressString)


  // const urlAddress = `${Cypress.env("baseUrlData")}atlas/search/postcode/*`
  // cy.intercept(urlAddress).as("getAddress")

  // const urlCases = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
  // cy.intercept(urlCases).as("getCases")

  // cy.visit(`/?query=${queryString}`)

  // cy.wait("@getAddress").then(() => {
  //   cy.get("tbody>tr").first()
  //     .should("be.visible")
  //     .click()
  // })

  // cy.wait("@getCases").then(() => {
  //   cy.get("h1")
  //     .contains(addressString)
  // })
})
