import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Debrief - No violation"', () => {

  describe('Go to Debrief form', () => {

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

    it('Select case by caseId and task "Debrief"', () => {
      cy.getCaseId().then((e) => {
        cy.scrollTo(0, 400)
        cy.get("tbody>tr")
          .contains("td", e.id)
          .siblings("td")
          .contains("td", "Debrief")
          .click()
      })
    })

    it('Intercept Debrief URL and load page', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const debriefResponse = response?.body?.find((e) => e.state?.status_name === "Debrief")
        const caseId = debriefResponse?.state?.case
        const debriefTask = debriefResponse?.tasks?.find((e) => e.name === "Verwerken debrief")
        const taskId = debriefTask.case_user_task_id

        // check dueDate
        cy.testDueDate("tbody>tr>td", 2)

        cy.visit(`/zaken/${caseId}/debriefing/${taskId}`)

        cy.url()
          .should('include', `/zaken/${caseId}/debriefing/${taskId}`)

        cy.get("h1")
          .contains(debrief.headerText)
      })
    })
  })

  describe('Fill in "Debrief" form', () => {

    it('Select "Wat is de uitkomst van het bezoek?"', () => {

      cy.get('[data-e2e-id="ADDITIONAL_RESEARCH_REQUIRED"]')
        .check({ force: true })
    })

    it('Type a note', () => {
      cy.get('[data-e2e-id="feedback"]')
      .type(debrief.descriptionAdditionalResearch)
    })

    it('Submit form and check debrief status', () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getNextTask')

      cy.get('button[data-e2e-id="submit"]')
        .contains(debrief.formButtonText)
        .click()

      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", debrief.labelAdditionalResearch)
        .and("contain", debrief.descriptionAdditionalResearch)
        .find(`button`)
        .contains(debrief.formButtonText)
        .click()

      cy.wait('@getNextTask').then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")

          cy.get("tbody>tr")
          .contains("td", "Debrief verwerken")
          .siblings("td")
          .contains(roles.PHH)
      })
    })

    it("Check debrief event in history", () => {
      cy.history("Debrief", "Projecthandhaver")
    })
  })
})