/*
 ** Set caseId to use this case in the next tests.
 ** caseId can be requested by:
 ** cy.getCaseId().then((e) => { console.log(e.id) })
*/

const PATH = "cypress/fixtures/case.json"

Cypress.Commands.add("setCaseId", () => {

  const url = `${Cypress.env("baseUrlAcc")}cases/*/`
  cy.intercept(url).as("getCase")

  cy.wait("@getCase").then(({ response }) => {
    cy.writeFile(PATH, { id: response?.body?.id })
    cy.log("caseId =>", response?.body?.id)
  })
})

Cypress.Commands.add("getCaseId", () => cy.readFile(PATH))
