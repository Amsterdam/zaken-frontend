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
