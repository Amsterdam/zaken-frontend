import testData from "../fixtures/addcase.json"

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

  it("Select Vakantieverhuur", () => {
    cy.get("#theme_1")
      .check({force: true})
  })
  
  it("Select Melding", () => {
    cy.get("#reason_0")
      .check({force: true})
  })
  
  it("Select anonieme melder", () => {
    cy.get('[data-e2e-id="yes"]')
      .check({force: true})
  })

  it("Set SIA id", () => {
    cy.get('[data-e2e-id="identification"]')
    .type(testData.sia_identification)
  })

  it("Set SIA description", () => {
    cy.get('[data-e2e-id="description_citizenreport"]')
    .type(testData.sia_description)
  })

  it("Set advertisement no", () => {
    cy.get("#advertisement_no")
      .check({force: true})
  })
  it("Set general description", () => {
    cy.get('[data-e2e-id="description"]')
    .type(testData.description)
  })

  it("Send form", () => {
    cy.get(`[data-e2e-id="submit"]`)
      .click()

    //TODO check modal for the right content (with use of fixture)
    cy.get(`[role="dialog"]`).should('have.length', 1)

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "Melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", testData.sia_identification)
      .and("contain", testData.sia_description)
      .and("contain", testData.description)
      .find(`button`)
      .contains("Zaak aanmaken")
      .click()
  })


  


  // Check for CaseDetail page
  it("Show CaseDetail page", () => {
    cy.get("h1")
    .contains("Zaakdetails")

    //TODO check if it's the right address (fixture)
    it("ZaakDetail has right address", () => {
      // Check for Home on landing page.
      cy.get("h1")
        .contains(`${address.street}, ${address.zipCode}`)
    })
  })

})