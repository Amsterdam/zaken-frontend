import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Select Next Step - closing case"', () => {

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

  it("Request is successfully processed", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
    cy.intercept(url).as('getEvents')
    cy.wait('@getEvents').then(() => {
      cy.get("h1").contains("Zaakdetails")
      cy.history("Uitzetten vervolgstap")
    })
  })
})
