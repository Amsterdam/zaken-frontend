import testData from "../../../../fixtures/addcase.json"
import address from "../../../../fixtures/address.json"

describe("Test add_case_not_anonymous_ad", () => {

  it("Login as projectmedewerker", () => {
    cy.loginAsPm()
  })

  it("Select address and create case", () => {
    cy.createCaseForAddress(address.queryString, `${address.street}, ${address.zipCode}`)
  })
})

describe("Create case and validate input", () => {
  it("Fill in form", () => {
    cy.wait(1000)
    cy.get("span")
      .contains("Vakantieverhuur")
      .siblings()
      .find("input")
      .check({force: true})

    cy.get("#reason_2")
      .check({force: true})

    cy.get('[data-e2e-id="no"]')
      .check({force: true})

    cy.get('[data-e2e-id="reporter_name"]')
      .type(testData.reporterName)

    cy.get('[data-e2e-id="reporter_phone"]')
      .type(testData.reporterPhone)

    cy.get('[data-e2e-id="reporter_email"]')
      .type(testData.reporterEmail)

    cy.get('[data-e2e-id="identification"]')
      .type(testData.siaIdentification)

    cy.get('[data-e2e-id="description_citizenreport"]')
      .type(testData.siaDescription)

    cy.get("#advertisement_yes")
      .check({force: true})

    cy.get('[data-e2e-id="advertisement_linklist[0]advertisement_link"]')
      .type(testData.advertisementUrl1)

    cy.get("#button-add-advertisement_linklist")
      .click()

    cy.get('[data-e2e-id="advertisement_linklist[1]advertisement_link"]')
      .should("be.visible")
      .type(testData.advertisementUrl2)


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
      .and("contain", "Nee, de melder is niet anoniem")
      .and("contain", "Ja, er is een advertentie")
      .and("contain", testData.advertisementUrl1)
      .and("contain", testData.advertisementUrl2)
      .and("contain", testData.reporterName)
      .and("contain", testData.reporterPhone)
      .and("contain", testData.reporterEmail)
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
    cy.history("Melding", "Projectmedewerker")
  })
})
