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
    cy.testDueDate("tbody>tr>td", 2)
  })

  it('TH can finish task "Opstellen verkorte rapportage huisbezoek"', () => {

    cy.get("tbody>tr")
      .should("have.length", 1)
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

  it("Task 'Opstellen verkorte rapportage huisbezoek' needs to be processed", () => {
    // Wait for the BE timer(10 sec) to process the task.
    cy.wait(10000)
    cy.get("a")
      .contains("Herlaad")
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

  it("Check Opstellen verkorte rapportage huisbezoek event in history", () => {
    cy.history(debrief.noViolationNextTask2)
  })
})