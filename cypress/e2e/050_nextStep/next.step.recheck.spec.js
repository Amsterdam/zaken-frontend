import debrief from "../../fixtures/debrief.json"
import address from "../../fixtures/address.json"

describe('Select Next Step - closing case"', () => {

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

  it("Select to close this case", () => {
    const url = `**/cases/*/`
    cy.intercept(url).as('getNextTask')

    cy.wait('@getNextTask').then(() => {

    // check dueDate
    cy.testDueDate("tbody>tr>td", 3)

    cy.get('button')
      .contains("Taak afronden")
      .should("have.length", 1)
      .click({force: true})
    })

    cy.get(`[role="dialog"]`)
      .should('have.length', 1)
      .and("contain", debrief.closingTask1)
    cy.get('[data-testid="next_step"]')
      .select(debrief.closingTask3)

    cy.get(`[data-testid="submit"]`)
      .click()
  })

  it("Request is successfully processed", () => {
    const url = `**/cases/*/events/`
    cy.intercept(url).as('getEvents')
    cy.wait('@getEvents').then(() => {
    cy.get("h1").contains("Zaakdetails")
    cy.get("tbody>tr>td").eq(1)
      .should("contain", "Inplannen Hercontrole")
    cy.history("Uitzetten vervolgstap", "Uitvoerder")
    })
  })

})
