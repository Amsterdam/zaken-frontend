### Cypress best practices

Please read:
https://docs.cypress.io/guides/references/best-practices.html

Summary:
- Set state programmatically, don't use the UI to build up state.
- Write specs in isolation, avoid coupling.
- Don't limit yourself trying to act like a user.
- Tests should always be able to be run independently and still pass.
- Only test what you control.
- Use data-* attributes to provide context to your selectors.
- Clean up state before tests run (not after).
