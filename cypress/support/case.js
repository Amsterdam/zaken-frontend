/*
 ** Set caseId to use this case in the next tests.
 ** caseId can be requested by: Cypress.env("caseId").
*/

Cypress.Commands.add("setCaseId", () => {
  const url = `${Cypress.env("baseUrlAcc")}cases/*/`
  cy.intercept(url).as('getCase')

  cy.wait('@getCase').then(({ response }) => {
    Cypress.env('caseId', response?.body?.id)
  })
})
