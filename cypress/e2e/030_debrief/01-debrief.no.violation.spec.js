import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Debrief - No violation"', () => {

  describe('Go to Debrief form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
      cy.intercept(url).as('getCases')
      cy.visit(`/adres/${address.bagId}`)
      cy.wait('@getCases').then(() => {
        cy.get("h1")
          .contains(`${address.street}, ${address.zipCode}`)
      })
    })

    it('Select case by caseId and intercept debrief url', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
      cy.intercept(url).as('getCase')

      cy.getCaseId().then((e) => {
        cy.scrollTo(0, 400)
        cy.get("tbody>tr")
          .contains("td", e.id)
          .siblings("td")
          .contains("td", "Debrief")
          .click()
      })

      cy.get("tbody>tr")
        .contains("td", debrief.taskName)
        .click()

      cy.get("h1")
        .contains(debrief.headerText)

    })
  })

  describe('Fill in "Debrief" form', () => {

    it('Select "Wat is de uitkomst van het bezoek?"', () => {

      cy.get('[data-e2e-id="NO"]')
        .check({ force: true })
    })

    it('Type a note', () => {
      cy.get('[data-e2e-id="feedback"]')
      .type(debrief.descriptionNoViolation)
    })

    it('Submit form and check debrief status', () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
      cy.intercept(url).as('getNextTask')

      cy.get('button[data-e2e-id="submit"]')
        .contains(debrief.formButtonText)
        .click()

      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", debrief.labelNo)
        .and("contain", debrief.descriptionNoViolation)
        .find(`button`)
        .contains(debrief.formButtonText)
        .click()

      cy.wait('@getNextTask').then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")
        cy.get("tbody>tr")
          .contains("td", debrief.noViolationNextTask)
          .siblings("td")
          .contains(roles.TH)
          .parents('td')
          .siblings('td')
          .contains("Taak afronden")
          .click({force: true})

        cy.get(`[role="dialog"]`)
          .should('have.length', 1)
          .contains(debrief.noViolationNextTask)

        cy.get(`[role="dialog"]`)
          .find('input[name="completed"]')
          .first()
          .check()
        cy.get(`[role="dialog"]`)
          .find('button')
          .contains("Taak afronden")
          .click()
      })
    })

    it("Check debrief event in history", () => {
      cy.history(debrief.noViolationNextTask, roles.PM)
    })
  })
})