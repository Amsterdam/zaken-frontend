import testData from "../../../../fixtures/addcase.json"
import address from "../../../../fixtures/address.json"

describe("Test add_case_anonymous_no_ad", () => {

  it("Login as projectmedewerker", () => {
    cy.loginAsPm()
  })
})

describe("Find address", () => {

  it("Search query", () => {
    cy.get("#2")
      .type(address.queryString)
      .wait(3000)
  })

  it("Go to first adress searchresults", () => {
    cy.get("tbody>tr").eq(0)
      .click()
  })

  it("Goto create case page", () => {
    // const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
    // cy.intercept(url).as('getAddress')
    cy.visit(`/adres/${address.bagId}`)
    cy.wait(5000)
    cy.get("span[data-e2e-id=btn_add_case]")
      .click()

    // cy.wait('@getAddress').then(() => {
    //   cy.get("span[data-e2e-id=btn_add_case]")
    //     .click()
    // })
  })
})

describe("Add case to address", () => {
  it("Fill in the form", () => {
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

    cy.get(`[role="dialog"]`).should('have.length', 1)

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "Melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", testData.siaIdentification)
      .and("contain", testData.siaDescription)
      .and("contain", testData.description)
      .find(`button`)
      .contains("Zaak aanmaken")
      .click()

    cy.url()
        .should('include', '/zaken/')
  })

  it("Show CaseDetail page", () => {
    cy.get("h1")
      .contains("Zaakdetails")
  })

  it("ZaakDetail has right address", () => {
    cy.get("h2")
      .contains(`${address.street}, ${address.zipCode}`)
  })

  it("History contains the right items", () => {
    cy.get("h2")
      .contains("Zaakhistorie")
    cy.get('button[title="Melding "]')
      .should("have.attr", "aria-expanded", "true")
      .contains("Melding")
    cy.get('button[title="Aanleiding "]')
      .should("have.attr", "aria-expanded", "false")
      .contains("Aanleiding")
  })
})
