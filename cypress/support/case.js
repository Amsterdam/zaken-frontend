// Select first case by address query string
Cypress.Commands.add("selectFirstCaseByAddressQuery", (queryString) => {

  expect(queryString, "queryString was set").to.be.a("string").and.not.be.empty

  cy.visit(`/?query=${queryString}`)

  cy.wait(1000)

  cy.get("tbody>tr").first()
    .should("be.visible")
    .click()

})