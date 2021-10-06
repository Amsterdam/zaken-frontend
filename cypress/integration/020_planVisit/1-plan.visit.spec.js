import address from "../../fixtures/address.json"
import visit from "../../fixtures/visit.json"

describe('Plan "huisbezoek"', () => {

  describe('Go to "Bezoek inplannen" form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
      cy.intercept(url).as("getCases")
      cy.visit(`/adres/${address.bagId}`)
      cy.wait("@getCases").then(() => {
        cy.get("h1")
          .contains(`${address.street}, ${address.zipCode}`)
      })
    })

    it("Adresoverzicht has right address", () => {
      cy.get("h1")
        .contains(`${address.street}, ${address.zipCode}`)
    })

    it("Select case by caseId", () => {
      cy.scrollTo(0, 400)
      cy.getCaseId().then((e) => {
        cy.log('caseId =>', e.id)
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })
    })

    it("Click on task Bezoek inplannen", () => {
      cy.get("tbody>tr")
        .contains("td", "Bezoek inplannen")
        .click()
    })

    it("Bezoek inplannen page is visible", () => {
      cy.get("h1")
        .contains("Bezoek inplannen")
      cy.get("dd")
        .contains(address.street)
    })
  })

  describe('Fill in "Bezoek inplannen" form', () => {

    it("Schedule day", () => {
      cy.get('[data-e2e-id="week_segment"]')
        .select(visit.weekSegment)
    })

    it("Schedule daypart", () => {
      cy.get('[data-e2e-id="day_segment"]')
        .select(visit.daySegment)
    })

    it("Schedule priority", () => {
      cy.get('[data-e2e-id="priority"]')
        .select(visit.priority)

    })

    it("Fill in description", () => {
      cy.get('[data-e2e-id="description"]')
        .type(visit.description)
    })

    it("Submit form", () => {
      cy.get(`[data-e2e-id="submit"]`)
        .click()
    })

    it("Check confirmation and submit", () => {
      cy.get("span").contains(visit.weekSegment)
      cy.get("span").contains(visit.daySegment)
      cy.get("span").contains(visit.priority)
      cy.get("span").contains(visit.description)

      cy.get(`[role="dialog"]`)
        .find("button")
        .contains("Bezoek inplannen")
        .click()
    })

    it("Request is successfully processed", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
      cy.intercept(url).as("getEvents")
      cy.wait("@getEvents").then(() => {
        cy.get("h1").contains("Zaakdetails")
        cy.get("h2").contains("Zaakhistorie")
        cy.get("span").contains("Bezoek ingepland ")
      })
    })
    
    it("History contains the right items", () => {
      cy.history("Bezoek ingepland", "Datum")
    })
  })
})
