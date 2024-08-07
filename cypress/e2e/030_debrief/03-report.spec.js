import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"
import address from "../../fixtures/address.json"

describe('Process Report Visit"', () => {

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
    cy.testDueDate("tbody>tr>td", 2)
  })

  it('TH can finish task "Opstellen rapport van bevindingen"', () => {

    cy.get("tbody>tr")
      .should("have.length", 3)
      .contains(debrief.violationNextTask3)
      .siblings('td')
      .contains(roles.TH)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.violationNextTask3)

    cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()

    cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
  })

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 2)
  })

  it("History contains the right items", () => {
    cy.history(debrief.violationNextTask3, "Uitvoerder")
  })


  it('TH can finish task "Opstellen beeldverslag"', () => {

    cy.get("tbody>tr")
      .should("have.length", 2)
      .contains(debrief.violationNextTask2)
      .siblings('td')
      .contains(roles.TH)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.violationNextTask2)

    cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()

    cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
  })

  it("History contains the right items", () => {
    cy.history(debrief.violationNextTask2, "Uitvoerder")
  })

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 1)
  })
  it('TH can finish task "Opstellen concept aanschrijving"', () => {

    cy.get("tbody>tr")
      .should("have.length", 1)
      .contains(debrief.violationNextTask1)
      .siblings('td')
      .contains(roles.PHH)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.violationNextTask1)

    cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()

    cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
  })

  it("History contains the right items", () => {
    cy.history(debrief.violationNextTask1, "Uitvoerder")
  })

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 2)
  })
  it("Check next task is 'Nakijken aanschrijving(en)'", () => {
    // const url = `**/cases/*/`
    // cy.intercept(url).as('getNextTask')

    // cy.wait('@getNextTask').then(() => {

      cy.scrollTo(0, 400)
      cy.get("h4")
        .contains("Debrief")
      cy.get("tbody>tr")
        .contains("td", debrief.summonNextStep1)
        .siblings("td")
        .contains(roles.HHJ)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})

      cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.summonNextStep1)

      cy.get(`[role="dialog"]`)
          .find('input[name="completed"]')
          .first()
          .check()

      cy.get(`[role="dialog"]`)
          .find('button')
          .contains("Taak afronden")
          .click()
    // })
  })

  it("History contains the right items", () => {
    cy.history(debrief.summonNextStep1, "Uitvoerder")
  })

  it('check dueDate', () => {
    cy.testDueDate("tbody>tr>td", 1)
  })
  it("Check next task is 'Verwerk aanschrijving'", () => {

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
  })
})