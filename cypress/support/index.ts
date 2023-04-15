/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Landing on home page of the app and sending request for games
     * @example
     * cy.landing()
     */
    landing(): Chainable<any>;
  }
}
