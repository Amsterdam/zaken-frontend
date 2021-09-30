import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Process Short Report Visit"', () => {

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
    // use cy.history(debrief.noViolationNextTask2)
    cy.get(`button[title="Opstellen  verkorte rapportage huisbezoek "]`)
      .should("have.attr", "aria-expanded", "true")
      .contains(debrief.noViolationNextTask2)
  })
})