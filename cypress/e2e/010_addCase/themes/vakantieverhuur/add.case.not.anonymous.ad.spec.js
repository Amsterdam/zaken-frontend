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

    cy.intercept("**/reasons/").as("getReasons")
    cy.intercept("**/subjects/").as("getSubjects")

    cy.get("span")
      .contains(/^Vakantieverhuur$/)
      .siblings()
      .find("input")
      .check({force: true})

    cy.wait(["@getReasons", "@getSubjects"]).then(() => {
      cy.get("span")
        .contains(/^SIG melding$/)
        .siblings()
        .find("input")
        .check({force: true})

      cy.get("span")
        .contains(dummyData.subject)
        .siblings()
        .find("input")
        .check({force: true})
    })

    cy.get('[data-testid="no"]')
      .check({force: true})

    cy.get('[data-testid="reporter_name"]')
      .type(testData.reporterName)

    cy.get('[data-testid="reporter_phone"]')
      .type(testData.reporterPhone)

    cy.get('[data-testid="reporter_email"]')
      .type(testData.reporterEmail)

    cy.get('[data-testid="identification"]')
      .type(testData.sigIdentification)

    cy.get('[data-testid="description_citizenreport"]')
      .type(testData.sigDescription)

    cy.get("#advertisement_yes")
      .check({force: true})

    cy.get('[data-testid="advertisement_linklist[0]advertisement_link"]')
      .type(testData.advertisementUrl1)

    cy.get("#button-add-advertisement_linklist")
      .click()

    cy.get('[data-testid="advertisement_linklist[1]advertisement_link"]')
      .should("be.visible")
      .type(testData.advertisementUrl2)


    cy.get('[data-testid="description"]')
      .type(testData.description)
  })

  it("Send form", () => {
    cy.get(`[data-testid="submit"]`)
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
      .and("contain", testData.sigIdentification)
      .and("contain", testData.sigDescription)
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
    cy.goToCaseDetailPage()
  })

  it("ZaakDetail has right address", () => {
    cy.get("h2")
      .contains(`${address.street}, ${address.zipCode}`)
  })

  it("History contains the right items", () => {
    cy.history("Melding", "Projectmedewerker")
  })
})
