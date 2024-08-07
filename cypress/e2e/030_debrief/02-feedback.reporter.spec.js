import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"
import address from "../../fixtures/address.json"

describe('Process Feedback reporter"', () => {

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

  // check dueDate
  cy.testDueDate("tbody>tr>td", 30)

  it('PM can finish task "Terugkoppelen melder"', () => {
    cy.get("tbody>tr")
      .contains(roles.PM)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
      .should('have.length', 1)
      .and("contain", debrief.noViolationNextTask)
      .find('input[name="completed"]')
      .first()
      .check()

    cy.get(`[role="dialog"]`)
      .find('button')
      .contains("Taak afronden")
      .click()
  })

  it("Check Terugkoppeling melder event in history", () => {
    const url = `**/cases/*/`
    cy.intercept(url).as('getNextTask')

    cy.wait('@getNextTask').then(() => {
      cy.history(debrief.noViolationNextTask, "Uitvoerder")
    })
  })
})
