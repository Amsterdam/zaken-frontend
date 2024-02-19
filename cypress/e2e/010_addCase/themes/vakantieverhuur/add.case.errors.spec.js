import dummyData from "../../../../fixtures/addcase.json"
import address from "../../../../fixtures/address.json"

describe("Test add_case_errors", () => {

  it("Login as projectmedewerker", () => {
    cy.loginAsPm()
  })

  it("Select address and create case", () => {
    cy.createCaseForAddress(address.queryString, `${address.street}, ${address.zipCode}`)
  })
})

describe("Fill in form and validate", () => {
  it("Select radio buttons", () => {

    cy.intercept("**/reasons/").as("getReasons")
    cy.intercept("**/subjects/").as("getSubjects")

    cy.get("span")
      .contains(/^Vakantieverhuur$/)
      .siblings()
      .find("input")
      .check({force: true})

    cy.wait(["@getReasons", "@getSubjects"]).then(() => {
      cy.get("#reason_0")
        .check({force: true})

      cy.get("span")
        .contains(dummyData.subject)
        .siblings()
        .find("input")
        .check({force: true})
    })

    cy.get('[data-testid="no"]')
      .check({force: true})
  })

  it("Zaak aanmaken button is disabled", () => {
    cy.get("button[data-testid=submit]")
      .should("be.disabled")
  })

  it("Check required fields", () => {

    cy.checkInvalidInput(
      '[data-testid="reporter_phone"]',
      "Vul hier enkel 10 cijfers in",
      dummyData.reporterPhone
    )

    cy.checkInvalidInput(
      '[data-testid="reporter_email"]',
      "Vul een geldig e-mailadres in",
      dummyData.reporterEmail
    )

    cy.checkRequiredField(
      '[data-testid="identification"]',
      dummyData.siaIdentification
    )

    cy.checkRequiredField(
      '[data-testid="description_citizenreport"]',
      dummyData.siaDescription
    )

    cy.get("#advertisement_yes")
      .check({force: true})

    cy.get("button[data-testid=submit]")
      .should("be.disabled")

    cy.checkRequiredField(
      '[data-testid="advertisement_linklist[0]advertisement_link"]',
      dummyData.advertisementUrl1
    )

    cy.get("button[data-testid=submit]")
      .should("be.enabled")

  })
})
