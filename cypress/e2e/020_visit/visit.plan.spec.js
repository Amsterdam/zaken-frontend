import moment from "moment"
import address from "../../fixtures/address.json"
import visit from "../../fixtures/visit.json"

describe('Plan "huisbezoek"', () => {

  describe('Go to "Bezoek inplannen" form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
      cy.intercept(url).as("getCases")
      cy.visit(`/adres/${address.bagId}`)
      cy.wait("@getCases").then(() => {
        cy.get("h1")
          .contains(`${address.street}, ${address.zipCode}`)
      })
    })

    it("Select case by caseId", () => {
      cy.scrollTo(0, 400)
      cy.getCaseId().then((e) => {
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })
    })

    it("Check right dueDate", () => {
      cy.testDueDate("tbody>tr>td", 0)
    })

    it("Click on task `Bepalen processtap`", () => {
      cy.get("tbody>tr")
        .contains("td", "Bepalen processtap")
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})
    })

    it("Select next step", () => {
      cy.get('[data-e2e-id="visit_next_step"]')
        .select(visit.nextStep)

      cy.get(`[data-e2e-id="submit"]`)
        .click()
    })

    it("Click on task Bezoek inplannen", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
      cy.intercept(url).as("getCase")
      cy.wait("@getCase").then(() => {
        cy.get("tbody>tr")
          .contains("td", "Bezoek inplannen")
          .click()
      })
    })

    it("Bezoek inplannen page is visible", () => {
      const url = `${Cypress.env("baseUrlAcc")}themes/*/schedule-types/`
      cy.intercept(url).as("getScheduleTypes")
      cy.wait("@getScheduleTypes").then(() => {
        cy.get("h1")
        .contains("Bezoek inplannen")
        cy.get("dd")
          .contains(address.street)
      })
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

    it("Schedule visit from", () => {
      cy.get('[data-e2e-id="visit_from"]')
        .select(visit.visitFrom)
    })

    it("Schedule visit from date", () => {
      cy.get('[data-e2e-id="visit_from_datetime"]')
        .type(moment().format("YYYY-MM-DD"))
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
        cy.history("Bezoek ingepland", "Datum")
      })
    })

  })
})
