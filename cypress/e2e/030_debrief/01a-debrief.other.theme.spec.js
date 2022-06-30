import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Debrief - Other Theme"', () => {

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

      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
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
      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
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