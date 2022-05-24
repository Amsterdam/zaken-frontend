import dummyData from "../../../../fixtures/addcase.json"
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

    cy.intercept("**/reasons/").as("getReasons")
    cy.intercept("**/subjects/").as("getSubjects")

    cy.get("span")
      .contains(/^Vakantieverhuur$/)
      .siblings()
      .find("input")
      .check({force: true})

    cy.wait(["@getReasons", "@getSubjects"]).then(() => {
      cy.get("span")
        .contains(/^SIA melding$/)
        .siblings()
        .find("input")
        .check({force: true})

      cy.get("span")
        .contains(dummyData.subject)
        .siblings()
        .find("input")
        .check({force: true})
    })

    cy.get('[data-e2e-id="yes"]')
      .check({force: true})

    cy.get('[data-e2e-id="identification"]')
      .type(dummyData.siaIdentification)

    cy.get('[data-e2e-id="description_citizenreport"]')
      .type(dummyData.siaDescription)

    cy.get("#advertisement_no")
      .check({force: true})

    cy.get('[data-e2e-id="description"]')
      .type(dummyData.description)
  })

  it("Send form", () => {

    cy.get(`[data-e2e-id="submit"]`)
      .click()

    cy.get(`[role="dialog"]`).should("have.length", 1)

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "SIA melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", dummyData.subject)
      .and("contain", dummyData.siaIdentification)
      .and("contain", dummyData.siaDescription)
      .and("contain", dummyData.description)
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
    cy.history("SIA melding verwerken", "Projectmedewerker")
  })
})
