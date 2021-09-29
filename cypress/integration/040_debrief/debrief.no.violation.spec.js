import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"

describe('Process result "huisbezoek"', () => {

  describe('Go to TOP "Resultaat bezoek" form', () => {

    it("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
      cy.intercept(url).as('getCases')
      cy.visit(`/adres/${address.bagId}`)
      cy.wait('@getCases').then(() => {
        cy.get("h1")
          .contains(`${address.street}, ${address.zipCode}`)
      })
    })

    it('Get first case with task "Huisbezoek" and go to "Zaakdetails"', () => {
      cy.scrollTo(0, 400)
      cy.get("tbody>tr")
        .contains("td", "Debrief")
        .click()
    })

    it('Intercept TOP URL and load page', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const debrief = response?.body?.find((e) => e.state?.status_name === "Verwerken debrief")
        const caseId = visit?.state?.case
        const debriefTask = visit?.tasks?.find((e) => e.name === "Debrief verwerken")
        const taskId = debriefTask.camunda_task_id

        const url = `${Cypress.env("baseUrlAcc")}users/`
        cy.intercept(url).as('getUsers')

        cy.visit(`/zaken/${caseId}/debrief/${taskId}`)

        // Intercept /users to wait for Toezichthouders next test
        cy.wait("@getUsers").then(() => {
          cy.get("h1")
            .contains(debrief.headerText)
        })

      })
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
      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
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
      })
    })

  })
})