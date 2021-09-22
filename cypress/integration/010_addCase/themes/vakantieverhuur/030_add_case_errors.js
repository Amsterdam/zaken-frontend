import testData from "../../../../fixtures/addcase.json"

describe("Try to login", () => {

  it("Login user", () => {
    cy.loginAsPm()
  })
})

describe("Find address", () => {
  
  it("Search query", () => {
    cy.get("#2")
      .type(testData.queryString)
      .wait(1000)
  })

  it("Go to first adress searchresults", () => {
    cy.get("tbody>tr").eq(0)
      .click()
  })
  
  it("Goto create case page", () => {
    cy.get("span[data-e2e-id=btn_add_case]")
      .click()
  })
})
  
describe("Add case to address", () => {
  it("Start filling in the form", () => {
    cy.get("#theme_1")
      .check({force: true})

    cy.get("#reason_0")
      .check({force: true})

    cy.get('[data-e2e-id="no"]')
      .check({force: true})
  })

  it("Zaak aanmaken button is disabled", () => {
    cy.get("button[data-e2e-id=submit]")
      .should("be.disabled")
  })

  it("Continue filling in the form", () => {

    cy.checkInvalidInput(
      '[data-e2e-id="reporter_phone"]', 
      "Vul hier enkel 10 cijfers in", 
      testData.reporterPhone
    )

    cy.checkInvalidInput(
      '[data-e2e-id="reporter_email"]', 
      "Vul een geldig e-mailadres in", 
      testData.reporterEmail
    )

    cy.checkRequiredField(
      '[data-e2e-id="identification"]', 
      testData.siaIdentification
    )

    cy.checkRequiredField(
      '[data-e2e-id="description_citizenreport"]', 
      testData.siaDescription
    )
    
    cy.get("#advertisement_yes")
      .check({force: true})

    cy.get("button[data-e2e-id=submit]")
      .should("be.disabled")

    cy.checkRequiredField(
      '[data-e2e-id="advertisement_linklist[0]advertisement_link"]', 
      testData.advertisementUrl1
    )

    cy.get("button[data-e2e-id=submit]")
      .should("be.enabled")

  })
})
