/*
 ** Set caseId to use this case in the next tests.
 ** caseId can be requested by:
 ** cy.getCaseId().then((e) => { console.log(e.id) })
*/

const PATH = "cypress/fixtures/case.json"

Cypress.Commands.add("setCaseId", () => {
  const url = `**/cases/*/`
  cy.intercept(url).as("getCase")

  cy.wait("@getCase", { timeout: 20000 })
    .then(({ response }) => {
      cy.writeFile(PATH, { id: response?.body?.id })
      cy.log("caseId =>", response?.body?.id)
    })
})

Cypress.Commands.add("getCaseId", () => cy.readFile(PATH))

// Check for CaseDetailPage with Case ID to be visible
Cypress.Commands.add("goToCaseDetailPage", () => {
  cy.getCaseId().then((e) => {
    cy.visit(`/zaken/${ e.id }`)
  })

  cy.get("h1")
    .contains("Zaakdetails")

  cy.getCaseId().then((e) => {
    cy.get("dt")
      .contains("Zaak ID")
      .siblings("dd", e.id)
  })
})

//Check for right item to exist and opened in history
Cypress.Commands.add("history", (openedItemName, labelToCheck) => {
  cy.get("h2").contains("Zaakhistorie")
  cy.scrollTo(0, 400);
  cy.get(`button:contains(${openedItemName})`)
    .should("have.attr", "aria-expanded", "true")
    .parent()
    .siblings("div", `${labelToCheck}`)

    // if one other event is closed, we assume the rest will be closed too
  cy.get('button[title="Aanleiding "]')
    .should("have.attr", "aria-expanded", "false")
    .contains("Aanleiding")
})
