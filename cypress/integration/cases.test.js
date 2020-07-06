export default context("Cases", () => {
  const apiFixture = {
    startdatum: "2020-02-02",
    einddatum: "2019-01-01",
    zaaktype: "",
    toelichting: "API boulevard 12, 9999ZZ",
    omschrijving: "Already added"
  }

  const browserFixture = {
    startdatum: "2019-01-01",
    einddatum:  "2019-02-03",
    zaaktype: "Illegale vakantieverhuur",
    toelichting: "Teststraat 1, 1111AA",
    omschrijving: "End to end test"
  }

  beforeEach(() => {
    cy.cleanDatabase()
      .then((response: any) => {
        // After cleaning the database, a new case_type URL is generated.
        // We need it to be able to programmatically create a case
        apiFixture.zaaktype = response.body.case_type.url
      })
  })

  it("should be able to add a case", () => {
    cy.visit("cases/create")
    cy.autoFill(browserFixture)
    cy.getSubmitButton().click()

    // Assertions:
    // ---

    cy.get("[data-e2e-id='alert'][data-e2e-variant='success']").should("be.visible")
  })

  it("should be able to edit a case", () => {
    // We need a pre-existing case to edit.
    cy.postToAPI("cases/", apiFixture)
      .then((response: any) => {
        cy.visit(`cases/${ response.body.uuid }`)
        cy.autoFill(browserFixture)
        cy.getSubmitButton().click()

        // Assertions:
        // ---

        cy.get("[data-e2e-id='alert'][data-e2e-variant='success']").should("be.visible")
      })
  })

  it("should be able to delete a case", () => {
    // We need a pre-existing case to delete.
    cy.postToAPI("cases/", apiFixture)
      .then((response: any) => {
        cy.visit(`cases/${ response.body.uuid }`)
        cy.get("[data-e2e-id='delete']").click()
        cy.get("[data-e2e-id='confirm']").click()

        // Assertions:
        // ---

        cy.get("[data-e2e-id='alert'][data-e2e-variant='success']").should("be.visible")
      })
  })
})
