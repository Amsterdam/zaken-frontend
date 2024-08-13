import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"
import address from "../../fixtures/address.json"
import summon from "../../fixtures/summon.json"

describe('Process Summon"', () => {

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

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 3)
  })

  it("History contains the right items", () => {
    cy.history(debrief.summonNextStep1, "Uitvoerder")
  })

  it("PHH can finish task 'Verwerk aanschrijving'", () => {

    cy.scrollTo(0, 400)
    cy.get("h4")
      .contains("Aanschrijving")
    cy.get("tbody>tr")
      .contains("td", debrief.summonNextStep2)
      .siblings("td")
      .contains(roles.PHH)
      .parents('td')
      .siblings('td')
      .contains(debrief.summonTask1)
      .click({force: true})
  })

  describe('Fill in "Summon" form', () => {

    it("Select type of summon", () => {
      cy.get('[data-testid="type"]')
        .select(summon.typeWarningVv)
    })

    it("Type name person 1", () => {
      cy.get('[data-testid="persons[0]first_name"]')
        .type(summon.firstName1)
      cy.get('[data-testid="persons[0]preposition"]')
        .type(summon.preposition1)
      cy.get('[data-testid="persons[0]last_name"]')
        .type(summon.lastName1)
      cy.get('[data-testid="persons[0]person_role"]')
        .select(summon.role1)
    })

    it("Type name person 2", () => {
      cy.get("#button-add-persons")
        .click()

      cy.get('[data-testid="persons[1]first_name"]')
        .type(summon.firstName2)
      cy.get('[data-testid="persons[1]preposition"]')
        .type(summon.preposition2)
      cy.get('[data-testid="persons[1]last_name"]')
        .type(summon.lastName2)
      cy.get('[data-testid="persons[1]person_role"]')
        .select(summon.role2)
    })

    it("Fill in description", () => {
      cy.get('[data-testid="description"]')
        .type(summon.description)
    })

    it('Submit form and check debrief status', () => {
      const url = `**/cases/*/`
      cy.intercept(url).as('getNextTask')

      cy.get('button[data-testid="submit"]')
        .contains(summon.formButtonText)
        .click()

      cy.get(`[role="dialog"]`).should('have.length', 1)

      cy.get(`[role="dialog"]`)
        .should("contain", summon.typeWarningVv)
        .and("contain", summon.firstName1)
        .and("contain", summon.firstName2)
        .and("contain", summon.preposition1)
        .and("contain", summon.preposition2)
        .and("contain", summon.lastName1)
        .and("contain", summon.lastName2)
        .and("contain", summon.role1)
        .and("contain", summon.role2)
        .and("contain", summon.description)
        .find(`button`)
        .contains(summon.formButtonText)
        .click()
    })

    it("Check next task is 'Uitzetten vervolgstap'", () => {
      const url = `**/cases/*/`
      cy.intercept(url).as('getNextTask')

      cy.wait('@getNextTask').then(() => {

        cy.scrollTo(0, 400)
        cy.get("h4")
          .contains("Vervolgstap")
          .next("p")
          .contains(`${summon.firstName1} ${summon.preposition1} ${summon.lastName1}, ${summon.firstName2} ${summon.preposition2} ${summon.lastName2}`)
        cy.get("tbody>tr")
          .contains("td", debrief.closingTask1)
          .siblings("td")
          .contains(roles.PHH)
          .parents('td')
          .siblings('td')
          .contains("Taak afronden")
      })
    })
  })
})