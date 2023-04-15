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

Cypress.Commands.add("landing", () => {
  const baseURL = "https://api.rawg.io/api";

  cy.intercept(`${baseURL}/games`, {
    results: [
      {
        id: 1,
        name: "The Witcher 3: Wild Hunt",
        background_image:
          "https://media.rawg.io/media/crop/600/400/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
        parent_platforms: [
          { id: 1, name: "PC", slug: "pc" },
          { id: 2, name: "PlayStation", slug: "playstation" },
          { id: 3, name: "Xbox", slug: "xbox" },
          { id: 7, name: "Nintendo", slug: "nintendo" },
        ],
        metacritic: "92",
      },
      {
        id: 2,
        name: "BioShock Infinite",
        background_image:
          "https://media.rawg.io/media/crop/600/400/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
        parent_platforms: [
          { id: 1, name: "PC", slug: "pc" },
          { id: 2, name: "PlayStation", slug: "playstation" },
          { id: 3, name: "Xbox", slug: "xbox" },
          { id: 6, name: "Linux", slug: "linux" },
          { id: 7, name: "Nintendo", slug: "nintendo" },
        ],
        metacritic: "94",
      },
    ],
  });
});
