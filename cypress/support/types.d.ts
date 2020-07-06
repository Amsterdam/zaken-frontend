declare namespace Cypress {
  // Don't change this interface to a type
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Chainable<Subject = any> {
    cleanDatabase(): Chainable<undefined>

    autoFill(values: Record<string, string>): Chainable<undefined>

    getSubmitButton(): Chainable<Element>

    postToAPI(path: string, body: {}): Chainable<Element>
  }
}
