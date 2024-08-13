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

    it('Intercept TOP URL and load page', () => {

      const url = `**/cases/*/`
      cy.intercept(url).as('getTasks')

      cy.wait('@getTasks').then(({ response }) => {
        const visit = response?.body?.workflows?.find((e) => e.state?.name === "Huisbezoek")
        const topTask = visit?.tasks?.find((e) => e.name === "Doorgeven Huisbezoek TOP")
        const caseId = topTask?.case
        const taskId = topTask.case_user_task_id

        // Check role
        cy.get("tbody>tr>td").eq(2)
          .should("contain", roles.TH)

        // check dueDate
        cy.testDueDate("tbody>tr>td", 0)

        const url = `**/users/`
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

      cy.get('[data-testid="author1"] > option')
        .eq(visit.author1)
        .then(element => cy.get('[data-testid="author1"]').select(element.val()))

      cy.get('[data-testid="author2"] > option')
        .eq(visit.author2)
        .then(element => cy.get('[data-testid="author2"]').select(element.val()))
    })

    it('Set "Starttijd onderzoek"', () => {
      cy.get('[data-testid="start_time"]')
        .clear()
        .type(new Date().toJSON().substring(0,16))
    })

    it('Select situation', () => {
      cy.get(`[data-testid=${visit.situation}]`)
        .check({ force: true })
    })

    it('Select observations', () => {
      cy.get('input[name="observations"]')
        .last()
        .check()
    })

    it('Select next visit directly', () => {
      cy.get(`[data-testid=${visit.canNextVisitGoAhead}]`)
        .check({ force: true })
    })

    it('Type description next visit directly', () => {
      cy.get('[data-testid="can_next_visit_go_ahead_description"')
        .type(visit.canNextVisitGoAheadDescription)
    })

    it('Submit form and check for plan new visit', () => {
      const url = `**/cases/*/events/`
      cy.intercept(url).as('getEvents')

      cy.get('button[data-testid="submit"]')
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
