import address from "../fixtures/address.json"
import visit from "../fixtures/visit.json"

describe('Plan "huisbezoek"', () => {

  describe('Go to "Bezoek inplannen" form', () => {

    it("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht", () => {
      cy.visit(`/adres/${address.bagId}`)
      cy.wait(2000)
    })

    it("Adresoverzicht has right address", () => {
      cy.get("h1")
        .contains(`${address.street}, ${address.zipCode}`)
    })

    it('Get first case with task "Inplannen Huisbezoek"', () => {
      cy.get("tbody>tr")
        .contains("td", "Inplannen Huisbezoek")
        .click()
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
        .should("be.visible")
        .select(visit.weekSegment)
    })

    it("Schedule daypart", () => {
      cy.get('[data-e2e-id="day_segment"]')
        .should("be.visible")
        .select(visit.daySegment)
    })

    it("Schedule priority", () => {
      cy.get('[data-e2e-id="priority"]')
        .should("be.visible")
        .select(visit.priority)

    })

    it("Fill in description", () => {
      cy.get('[data-e2e-id="description"]')
        .should("be.visible")
        .type(visit.description)
    })

    it("Submit form", () => {
      cy.get(`[data-e2e-id="submit"]`)
        .should("be.visible")
        .click()
    })

    it("Check confirmation and submit", () => {
      cy.get("span").contains(visit.weekSegment)
      cy.get("span").contains(visit.daySegment)
      cy.get("span").contains(visit.priority)
      cy.get("span").contains(visit.description)

      cy.get(`[role="dialog"]`)
        .find(`button`)
        .contains("Bezoek inplannen")
        .should("be.visible")
        .click()
    })

    it("Request is successfully processed", () => {
      cy.wait(2000)
      cy.get("h1").contains("Zaakdetails")
      cy.wait(1000)
      cy.get("h2").contains("Zaakhistorie")
      cy.wait(1000)
      cy.get("span").contains("Bezoek ingepland ")
    })
  })
})
