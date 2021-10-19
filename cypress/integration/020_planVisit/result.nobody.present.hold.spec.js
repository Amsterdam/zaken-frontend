import address from "../../fixtures/address.json"
import visitResult from "../../fixtures/visitResult.json"
import roles from "../../fixtures/roles.json"

const visit = visitResult.nobodyPresentHold

describe('Result "huisbezoek" with nobody present and hold', () => {

  describe('Go to TOP "Resultaat bezoek" form', () => {

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

    it("Select case by caseId", () => {
      cy.scrollTo(0, 400)
      cy.getCaseId().then((e) => {
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })
    })

    it('Intercept TOP URL and load page', () => {

      const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const visit = response?.body?.find((e) => e.state?.status_name === "Huisbezoek")
        const caseId = visit?.state?.case
        const topTask = visit?.tasks?.find((e) => e.name === "Doorgeven Huisbezoek TOP")
        const taskId = topTask.case_user_task_id

        // Check role
        cy.get("tbody>tr>td").eq(2)
          .should("contain", roles.TH)

        // check dueDate
        cy.get("tbody>tr>td").eq(3)
          .should("contain", "-")

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

    it('Select observations', () => {
      cy.get('input[name="observations"]')
        .last()
        .check()
    })

    it('Select next visit directly', () => {
      cy.get(`[data-e2e-id=${visit.canNextVisitGoAhead}]`)
        .check({ force: true })
    })

    it('Type description next visit directly', () => {
      cy.get('[data-e2e-id="can_next_visit_go_ahead_description"')
        .type(visit.canNextVisitGoAheadDescription)
    })

    it('Submit form and check for plan new visit', () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
      cy.intercept(url).as('getEvents')

      cy.get('button[data-e2e-id="submit"]')
        .contains("Toevoegen")
        .click()

      cy.wait("@getEvents").then(() => {
        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Debrief")
        cy.get("tbody>tr")
          .contains("td", "Debrief verwerken")
        cy.get("span")
          .contains("Niemand aanwezig")
        cy.get("span")
          .contains(visit.canNextVisitGoAheadDescription)
      })
    })

  })
})
