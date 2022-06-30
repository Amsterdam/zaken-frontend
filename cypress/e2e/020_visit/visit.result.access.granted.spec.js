import address from "../../fixtures/address.json"
import visitResult from "../../fixtures/visitResult.json"
import roles from "../../fixtures/roles.json"

const visit = visitResult.accessGranted

describe('Result "huisbezoek" with access granted', () => {

  describe('Go to TOP "Resultaat bezoek" form', () => {

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

    it("Select case by caseId and intercept TOP url", () => {
      const url = `${ Cypress.env("baseUrlAcc") }cases/*/`
      cy.intercept(url).as('getCase')

      cy.scrollTo(0, 400)
      cy.getCaseId().then((e) => {
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })

      cy.wait('@getCase').then(({ response }) => {
        const visit = response?.body?.workflows?.find((e) => e.state?.name === "Huisbezoek")
        const topTask = visit?.tasks?.find((e) => e.name === "Doorgeven Huisbezoek TOP")
        const caseId = topTask?.case
        const taskId = topTask.case_user_task_id

        // Check role
        cy.get("tbody>tr>td").eq(2)
          .should("contain", roles.TH)

        cy.testDueDate("tbody>tr>td", 0)

        const url = `${Cypress.env("baseUrlAcc")}users/`
        cy.intercept(url).as('getUsers')

        cy.visit(`/zaken/${caseId}/huisbezoek/${taskId}`)

        // Intercept /users to wait for Toezichthouders next test
        cy.wait('@getUsers').then(() => {
          cy.get("h1")
            .contains('Resultaat bezoek')
        })

      })
    })
  })

  describe('Fill in "Resultaat bezoek" form', () => {

    it('Select "Toezichthouders"', () => {

      cy.get('[data-e2e-id="author1"] > option')
        .eq(visit.author1)
        .then(element => cy.get('[data-e2e-id="author1"]').select(element.val()))

      cy.get('[data-e2e-id="author2"] > option')
        .eq(visit.author2)
        .then(element => cy.get('[data-e2e-id="author2"]').select(element.val()))
    })

    it('Set "Starttijd onderzoek"', () => {
      cy.get('[data-e2e-id="start_time"]')
        .clear()
        .type(new Date().toJSON().substring(0,16))
    })

    it('Select situation', () => {
      cy.get(`[data-e2e-id=${visit.situation}]`)
        .check({ force: true })
    })

    it('Type a note', () => {
      cy.get('[data-e2e-id="notes"')
        .type(visit.notes)
    })

    it('Submit form and check debrief status', () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/`
      cy.intercept(url).as('getDebriefTask')

      cy.get('button[data-e2e-id="submit"]')
        .contains("Toevoegen")
        .click()

      cy.wait('@getDebriefTask').then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")
        cy.get("tbody>tr")
          .contains("td", "Debrief verwerken")
      })
    })

  })
})
