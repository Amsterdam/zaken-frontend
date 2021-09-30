import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"

describe('Select Next Step - closing case"', () => {

  it('Intercept Afronding URL and load page', () => {

    const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
    cy.intercept(url).as('getTasks')

    //force intercept
    cy.reload()
    
    cy.wait('@getTasks').then(({ response }) => {
      const closingResponse = response?.body?.find((e) => e.state?.status_name === debrief.closingTask2)
      const caseId = closingResponse?.state?.case
      const closingTask = closingResponse?.tasks?.find((e) => e.name === debrief.closingTask2)
      const taskId = closingTask.camunda_task_id

      const url = `${Cypress.env("baseUrlAcc")}themes/58/case-close-reasons`
      cy.intercept(url).as('getCloseReasons')
      cy.get("h4")
        .contains(debrief.closingTask2)
      cy.get("tbody>tr")
        .contains("td", debrief.closingTask2)
        .siblings("td")
        .contains(roles.PM)
        .parents('td')
        .siblings('td')
        .contains("Zaak afsluiten")

      cy.visit(`/zaken/${caseId}/afronding/${taskId}`)

      cy.wait("@getCloseReasons").then(() => {
        cy.get("h1")
          .contains("Zaak afronden")
      })
    })
  })

  it("Fill in the form", () => {
    cy.get("label[for='reason_3']")
      .find('[data-e2e-id="3"]')
      .check({force: true})

      cy.get('[data-e2e-id="description"]')
        .type(debrief.closingDescription)

      cy.get('button[data-e2e-id="submit"]')
        .contains("Verwerken")
        .click()
  })

  it("Submit the form", () => {
    cy.get(`[role="dialog"]`).should('have.length', 1)

    cy.get(`[role="dialog"]`)
      .should("contain", debrief.closingReason3)
      .and("contain", debrief.closingDescription)
      .find(`button`)
      .contains("Verwerken")
      .click()
  })

  it("Request is successfully processed", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
    cy.intercept(url).as('getEvents')
    cy.wait('@getEvents').then(() => {
      cy.get("h1").contains("Zaakdetails")
      cy.get("h2").contains("Status").should("not.exist")
      cy.history("Zaak afgerond")
    })
  })
})