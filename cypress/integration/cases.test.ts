export default context("Cases", () => {
  const apiFixture = {
    start_date: "2020-02-02",
    end_date: "2019-01-01",
    case_type: null,
    address: { bag_id: "Some other sort of ID" }
  }

  const browserFixture = {
    start_date: "2019-01-01",
    end_date:  "2019-02-03",
    case_type: "Safari",
    address: "Some sort of ID"
  }

  beforeEach(() => {
    cy
      .cleanDatabase()
      .then((response: any) => {
        // After cleaning the database, a new case_type URL is generated.
        // We need it to be able to programmatically create a case
        apiFixture.case_type = response.body.case_types[0]
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
        cy.visit(`cases/${ response.body.identification }`)
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
        cy.visit(`cases/${ response.body.identification }`)
        cy.get("[data-e2e-id='delete']").click()
        cy.get("[data-e2e-id='confirm']").click()

        // Assertions:
        // ---

        cy.get("[data-e2e-id='alert'][data-e2e-variant='success']").should("be.visible")
      })
  })
})
