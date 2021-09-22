import testData from "../../../fixtures/addcase.json"

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
  it("Fill in the form", () => {
    cy.get("#theme_1")
      .check({force: true})

    cy.get("#reason_0")
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
    cy.intercept('/zaken/*').as('getCaseDetailPage')
    cy.get(`[data-e2e-id="submit"]`)
      .click()

    cy.get(`[role="dialog"]`).should('have.length', 1)

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
      .find(`button`)
      .contains("Zaak aanmaken")
      //.click()
      .wait(2000)
  })

  // Check for CaseDetail page
  it("Show CaseDetail page", () => {
    cy.get("h1")
      .contains("Zaakdetails")
  })
  //Check if it's the right address
  it("ZaakDetail has right address", () => {
    cy.get("h2")
      .contains(`${testData.street}, ${testData.zipCode}`)
  })
})
