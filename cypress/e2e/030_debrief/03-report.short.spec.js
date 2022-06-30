import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"
import address from "../../fixtures/address.json"

describe('Process Short Report Visit"', () => {

  it("Go to Adresoverzicht and check address", () => {
    const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
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

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 3)
  })

  it('PHH can finish task "Uitzetten vervolgstap"', () => {

    cy.get("tbody>tr")
      .should("have.length", 3)
      .contains(roles.PHH)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
      .should('have.length', 1)
      .contains(debrief.closingTask1)

    cy.get('[data-e2e-id="next_step"]')
      .select(debrief.closingTask2)

    cy.get(`[role="dialog"]`)
      .find('button')
      .contains("Taak afronden")
      .click()
  })

  it("Check next task is 'Afsluiten zaak'", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/`
    cy.intercept(url).as('getNextTask')

    cy.wait('@getNextTask').then(() => {

      cy.scrollTo(0, 400)
      cy.get("h4")
        .contains(debrief.closingTask2)
      cy.get("tbody>tr")
        .contains("td", debrief.closingTask4)
        .siblings("td")
        .contains(roles.PM)
    })
  })

  it("Check Uitzetten vervolgstap event in history", () => {
    cy.history(debrief.closingTask1)
  })
})