//Check for CaseDetailPage with Case ID to be visible
Cypress.Commands.add("shouldBeOnCaseDetailPage", () => {
  cy.get("h1")
    .contains("Zaakdetails")

  cy.get("dt")
    .contains("Zaak ID")
    .siblings("dd")
    .invoke('text')
    .then((text) => {
      expect(text.length).to.equal(6)
  })
})

//Check for right item to exist and opened in history
Cypress.Commands.add("history", (openedItemName) => {
  cy.get("h2").contains("Zaakhistorie")
  cy.get(`button[title="${openedItemName} "]`)
    .should("have.attr", "aria-expanded", "true")
    .contains(openedItemName)
  
    // if one other event is closed, we assume the rest will be closed too   
  cy.get('button[title="Aanleiding "]')
    .should("have.attr", "aria-expanded", "false")
    .contains("Aanleiding")

})