import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Feedback reporter"', () => {

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

  it("Check Terugkoppeling melder(s) event in history", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
    cy.intercept(url).as('getNextTask')

    cy.wait('@getNextTask').then(() => {
      cy.history(debrief.noViolationNextTask1)
    })
  })
})
    