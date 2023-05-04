/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    landing(): Chainable<any>;
    dynamicSearchRequest(
      searchQuery: string,
      searchString: string
    ): Chainable<any>;
    sortQuery(query: string): Chainable<any>;
  }
}
