// / <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { Game } from "../../src/hooks/useGames";

const baseURL = "https://api.rawg.io/api";
const RAWG_API_KEY = "?key=" + Cypress.env("RAWG_API_KEY");

Cypress.Commands.add("landing", () => {
  cy.intercept("GET", `${baseURL}/games${RAWG_API_KEY}`, {
    fixture: "games.json",
  }).as("getGames");

  cy.intercept("GET", `${baseURL}/genres${RAWG_API_KEY}`, {
    fixture: "genres.json",
  }).as("getGenres");

  cy.intercept("GET", `${baseURL}/games${RAWG_API_KEY}&genres=51`, {
    fixture: "indieSelection.json",
  }).as("getIndieGames");

  cy.intercept("GET", `${baseURL}/games${RAWG_API_KEY}&platforms=3`, {
    fixture: "xboxSelection.json",
  }).as("getXboxPlatform");
});

Cypress.Commands.add("dynamicSearchRequest", (searchQuery, searchString) => {
  cy.intercept(
    "GET",
    `${baseURL}/games${RAWG_API_KEY}&search=${searchQuery}`,
    (req) => {
      const data = require("../fixtures/games.json");
      const filteredResults = data.results.filter((game: Game) => {
        return game.name.toLowerCase().includes(searchString.toLowerCase());
      });
      req.reply({ results: filteredResults });
    }
  ).as("searchGames");
});
