//test the due date by passing the element and the number of days a task may take
Cypress.Commands.add("testDueDate", (element, numberOfDays) => {
  cy.get(element)
    // TODO duedates are not decided yet (UX), BE has not implemented them
    // .should("contain", Cypress.dayjs().add(numberOfDays, "day").format('DD-MM-YYYY'))
    .should("contain", "-")
})