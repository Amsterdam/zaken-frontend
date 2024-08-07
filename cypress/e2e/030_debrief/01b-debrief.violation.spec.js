import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Debrief - Violation"', () => {

  describe('Go to Debrief form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `**/addresses/*/cases/`
      cy.intercept(url).as('getCases')
      cy.visit(`/adres/${address.bagId}`)
      cy.wait('@getCases').then(() => {
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

    it('Intercept Debrief URL and load page', () => {

      const url = `**/cases/*/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const debriefResponse = response?.body?.workflows?.find((e) => e.state?.name === "Debrief")
        const debriefTask = debriefResponse?.tasks?.find((e) => e.name === "Verwerken debrief")
        const caseId = debriefTask?.case
        const taskId = debriefTask.case_user_task_id

        // check dueDate
        cy.testDueDate("tbody>tr>td", 0)

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

      cy.get('[data-testid="YES"]')
        .check({ force: true })
    })

    it('Type a note', () => {
      cy.get('[data-testid="feedback"]')
      .type(debrief.violationDescription)
    })

    it('Submit form and check debrief status', () => {
      const url = `**/cases/*/`
      cy.intercept(url).as('getNextTask')

      cy.get('button[data-testid="submit"]')
        .contains(debrief.formButtonText)
        .click()

      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", debrief.labelYes)
        .and("contain", debrief.violationDescription)
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
      cy.history("Debrief", "Projecthandhaver")
    })
  })
})