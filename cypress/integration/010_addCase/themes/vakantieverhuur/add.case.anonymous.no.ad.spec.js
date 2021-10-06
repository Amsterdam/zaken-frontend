import testData from "../../../../fixtures/addcase.json"
import address from "../../../../fixtures/address.json"

describe("Test add_case_anonymous_no_ad", () => {

  it("Login as projectmedewerker", () => {
    cy.loginAsPm()
  })

  it("Select address and create case", () => {
    cy.createCaseForAddress(address.queryString, `${address.street}, ${address.zipCode}`)
  })
})

describe("Create case and validate input", () => {
  it("Fill in form", () => {
    cy.get("#theme_1")
      .check({force: true})

    cy.get("#reason_0")
      .check({force: true})

    cy.get('[data-e2e-id="yes"]')
      .check({force: true})

    cy.get('[data-e2e-id="identification"]')
      .type(testData.siaIdentification)

    cy.get('[data-e2e-id="description_citizenreport"]')
      .type(testData.siaDescription)

    cy.get("#advertisement_no")
      .check({force: true})

    cy.get('[data-e2e-id="description"]')
      .type(testData.description)
  })

  it("Send form", () => {
    cy.get(`[data-e2e-id="submit"]`)
      .click()

    cy.get(`[role="dialog"]`).should("have.length", 1)

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "Melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", testData.siaIdentification)
      .and("contain", testData.siaDescription)
      .and("contain", testData.description)
      .find("button")
      .contains("Zaak aanmaken")
      .click()

    // Set caseId to use in the next tests.
    cy.setCaseId()

    cy.url()
      .should("include", "/zaken/")
  })

  it("Show CaseDetail page", () => {
    cy.shouldBeOnCaseDetailPage()
  })

  it("ZaakDetail has right address", () => {
    cy.get("h2")
      .contains(`${address.street}, ${address.zipCode}`)
  })

  it("History contains the right items", () => {
    cy.history("Melding")
  })
})
