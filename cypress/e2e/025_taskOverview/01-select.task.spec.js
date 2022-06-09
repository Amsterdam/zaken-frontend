import address from "../../fixtures/address.json"
import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe("Task overview", () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Takenoverzicht", () => {
      const url = `${Cypress.env("baseUrlAcc")}tasks/*`
      cy.intercept(url).as('getTasks')
      cy.visit("/taken")
      cy.wait('@getTasks').then(() => {
        cy.get("h1")
          .contains("Takenoverzicht")
      })
    })

    it("Pick up task and put away ", () => {
      const url = `${Cypress.env("baseUrlAcc")}tasks/*/`
      cy.intercept(url).as('updateTask')
      const checkBox = cy.get('[type="checkbox"][title="Beschikbaar"]').first()
      checkBox.check()
      cy.wait('@updateTask').then((e) => {
        cy.get(`[type="checkbox"][data-e2e-id="${ e.response.body.id }"]`)
        checkBox.should('be.checked')
        checkBox.uncheck()
      })
    })

})
