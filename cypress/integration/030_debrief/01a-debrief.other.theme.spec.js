import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Debrief - No violation"', () => {

  describe('Go to Debrief form', () => {

    it.skip("Login as projectmedewerker", () => {
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

    it('Get first case with task "Debrief" and go to "Zaakdetails"', () => {
      cy.scrollTo(0, 400)
      cy.get("tbody>tr")
        .contains("td", "Debrief")
        .click()
    })

    it('Intercept Debrief URL and load page', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const debriefResponse = response?.body?.find((e) => e.state?.status_name === "Debrief")
        const caseId = debriefResponse?.state?.case
        const debriefTask = debriefResponse?.tasks?.find((e) => e.name === "Verwerken debrief")
        const taskId = debriefTask.camunda_task_id

        // check dueDate
        cy.get("tbody>tr>td").eq(3)
          .should("contain", "-")

        cy.visit(`/zaken/${caseId}/debriefing/${taskId}`)

        cy.url()
          .should('include', `/zaken/${caseId}/debriefing/${taskId}`)

        cy.get("h1")
          .contains(debrief.headerText)
      })
    })
  })

  describe('Fill in "Debrief" form', () => {

    it('Select "Naar ander thema"', () => {
      cy.get('[data-e2e-id="SEND_TO_OTHER_THEME"]')
        .check({ force: true })
    })
    it('Select "Ander thema"', () => {
      cy.get('select')
        .select('Kamerverhuur')
    })
    it('Type a note', () => {
      cy.get('[data-e2e-id="feedback"]')
      .type(debrief.otherThemeDescription)
    })

    it('Submit form and check debrief status', () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getNextTask')

      cy.get('button[data-e2e-id="submit"]')
        .contains(debrief.formButtonText)
        .click()

      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", debrief.labelOtherTheme)
        .and("contain", debrief.otherThemeDescription)
        .find(`button`)
        .contains(debrief.formButtonText)
        .click()

      cy.wait('@getNextTask').then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")
          // TODO BE should fix this first
        // cy.get("tbody>tr")
        //   .contains("td", debrief.noViolationNextTask1)
        //   .siblings("td")
        //   .contains(roles.PM)
        cy.get("tbody>tr")
          .contains("td", debrief.noViolationNextTask2)
          .siblings("td")
          .contains(roles.TH)
      })
    })

    it("Check debrief event in history", () => {
      cy.history("Debrief", "Projecthandhaver")
    })
  })
})