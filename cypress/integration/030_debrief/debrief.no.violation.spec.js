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

      cy.get('[data-e2e-id="NO"]')
        .check({ force: true })
    })

    it('Type a note', () => {
      cy.get('[data-e2e-id="feedback"]')
      .type(debrief.noViolationDescription)
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
        .and("contain", debrief.noViolationDescription)
        .find("button")
        .contains(debrief.formButtonText)
        .click()

      cy.wait('@getNextTask').then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")
        cy.get("tbody>tr")
          .contains("td", debrief.noViolationNextTask1)
          .siblings("td")
          .contains(roles.PM)
        cy.get("tbody>tr")
          .contains("td", debrief.noViolationNextTask2)
          .siblings("td")
          .contains(roles.TH)
      })
    })

    it("Check debrief event in history", () => {
      cy.get("h2")
        .contains("Zaakhistorie")
      cy.get('button[title="Debrief "]')
        .should("have.attr", "aria-expanded", "true")
        .contains("Debrief")
    })

    it('PM can finish task "Terugkoppeling melder(s)"', () => {
      cy.get("tbody>tr")
        .contains(roles.PM)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})

      cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .and("contain", debrief.noViolationNextTask1)
        .find('input[name="completed"]')
        .first()
        .check()

      cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
    })

    it("Check debrief event in history", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getNextTask')

      cy.wait('@getNextTask').then(() => {
        cy.get("h2")
        .contains("Zaakhistorie")
      cy.get(`button[title="${debrief.noViolationNextTask1} "]`)
        .should("have.attr", "aria-expanded", "true")
        .contains(debrief.noViolationNextTask1)
      })
    })

    it('TH can finish task "Opstellen verkorte rapportage huisbezoek"', () => {
      cy.get("tbody>tr")
        .contains(roles.TH)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})

      cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.noViolationNextTask2)

      cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()

      cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
    })

    it("Check next task is 'Uitzetten vervolgstap'", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getNextTask')

      cy.wait('@getNextTask').then(() => {

        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Vervolgstap")
        cy.get("tbody>tr")
          .contains("td", debrief.closingTask1)
          .siblings("td")
          .contains(roles.PHH)
          .parents('td')
          .siblings('td')
          .contains("Taak afronden")
      })
    })

    it("Check debrief event in history", () => {
      cy.scrollTo(0, 600)
      cy.get("h2")
        .contains("Zaakhistorie")
      // TODO when double spaces in bpmn are fixed in the backend
      // use debrief.noViolationNextTask2
      cy.get(`button[title="Opstellen  verkorte rapportage huisbezoek "]`)
        .should("have.attr", "aria-expanded", "true")
        .contains(debrief.noViolationNextTask2)
    })

    it("Select to close this case", () => {
      cy.get('button')
        .contains("Taak afronden")
        .click({force: true})

      cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .and("contain", debrief.closingTask1)
      cy.get('[data-e2e-id="next_step"]')
        .select(debrief.closingTask2)

      cy.get(`[data-e2e-id="submit"]`)
        .click()
    })

    it('Intercept Afronding URL and load page', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const closingResponse = response?.body?.find((e) => e.state?.status_name === debrief.closingTask2)
        const caseId = closingResponse?.state?.case
        const closingTask = closingResponse?.tasks?.find((e) => e.name === debrief.closingTask2)
        const taskId = closingTask.camunda_task_id

        const url = `${Cypress.env("baseUrlAcc")}themes/58/case-close-reasons`
        cy.intercept(url).as('getCloseReasons')
        cy.get("h4")
          .contains(debrief.closingTask2)
        cy.get("tbody>tr")
          .contains("td", debrief.closingTask2)
          .siblings("td")
          .contains(roles.PM)
          .parents('td')
          .siblings('td')
          .contains("Zaak afsluiten")

        cy.visit(`/zaken/${caseId}/afronding/${taskId}`)

        cy.wait("@getCloseReasons").then(() => {
          cy.get("h1")
            .contains("Zaak afronden")
        })
      })
    })

    it("Fill in the form", () => {
      cy.get("label[for='reason_3']")
        .find('[data-e2e-id="3"]')
        .check({force: true})

        cy.get('[data-e2e-id="description"]')
          .type(debrief.closingDescription)

        cy.get('button[data-e2e-id="submit"]')
          .contains("Verwerken")
          .click()
    })

    it("Submit the form", () => {
      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", debrief.closingReason3)
        .and("contain", debrief.closingDescription)
        .find("button")
        .contains("Verwerken")
        .click()
    })

    it("Request is successfully processed", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
      cy.intercept(url).as('getEvents')
      cy.wait('@getEvents').then(() => {
        cy.get("h1").contains("Zaakdetails")
        cy.get("h2").contains("Zaakhistorie")
        cy.get("h2").contains("Status").should("not.exist")
        cy.get("span").contains("Zaak afgerond ")
        cy.get("span").contains("Uitzetten vervolgstap ")
      })
    })
  })
})