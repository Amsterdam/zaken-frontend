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
      .type(testData.reporter_name)
    
    cy.get('[data-e2e-id="reporter_phone"]')
      .type(testData.reporter_phone)
    
    cy.get('[data-e2e-id="reporter_email"]')
      .type(testData.reporter_email)
    
    cy.get('[data-e2e-id="identification"]')
      .type(testData.sia_identification)
    
    cy.get('[data-e2e-id="description_citizenreport"]')
      .type(testData.sia_description)
    
    cy.get("#advertisement_yes")
      .check({force: true})

    cy.get('[data-e2e-id="advertisement_linklist[0]advertisement_link"]')
      .type(testData.advertisement_url1)

    cy.get("#button-add-advertisement_linklist")
      .click()
    
    cy.get('[data-e2e-id="advertisement_linklist[1]advertisement_link"]')
      .should("be.visible")
      .type(testData.advertisement_url2)


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
      .and("contain", testData.advertisement_url1)
      .and("contain", testData.advertisement_url2)
      .and("contain", testData.reporter_name)
      .and("contain", testData.reporter_phone)
      .and("contain", testData.reporter_email)
      .and("contain", testData.sia_identification)
      .and("contain", testData.sia_description)
      .and("contain", testData.description)
      .find(`button`)
      .contains("Zaak aanmaken")
      .click()
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
