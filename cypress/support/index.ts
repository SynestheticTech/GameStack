/// <reference types="cypress" />

declare namespace Cypress {
  // interface RouteMatcher<Body = any> {
  //   (body: Body): boolean;
  // }

  // interface InterceptOptions {
  //   searchQuery?: Record<string, any>;
  // }

  interface Chainable<Subject> {
    landing(): Chainable<any>;
    dynamicSearchRequest(
      searchQuery: string,
      searchString: string
    ): Chainable<any>;
    sortQuery(query: string): Chainable<any>;
  }
}
