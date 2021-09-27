// Check for empty textField
Cypress.Commands.add("checkRequiredField", ( field, validInput="test", errorMessage="Dit veld is verplicht") => {
    cy.get(field)
      .focus()
      .blur()
      .siblings()
      .contains(errorMessage)
  
    cy.get(field)
      .type(validInput)
      .siblings()
      .should("not.exist")
  })
  
  // Check for wrong input
  Cypress.Commands.add("checkInvalidInput", ( field, errorMessage, validInput, invalidInput="test") => {
    cy.get(field)
    .type(invalidInput)
      .blur()
      .siblings()
      .contains(errorMessage)
  
    cy.get(field)
      .clear()
      .type(validInput)
      .siblings()
      .should("not.exist")
  })