/*
 ** Set caseId to use this case in the next tests.
 ** caseId can be requested by: Cypress.env("caseId").
*/

const PATH = "cypress/fixtures/case.json"

Cypress.Commands.add("setCaseId", () => {

  const url = `${Cypress.env("baseUrlAcc")}cases/*/`
  cy.intercept(url).as("getCase")

  cy.wait("@getCase").then(({ response }) => {
    cy.writeFile(PATH, { id: response?.body?.id })
    cy.log("caseId =>", response?.body?.id)

    cy.wait(5000) // for testing purposes
  })
})

Cypress.Commands.add("getCaseId", () => cy.readFile(PATH))
