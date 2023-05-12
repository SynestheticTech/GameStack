const searchQuery = "The+Witcher+3";
const searchString = "The Witcher 3";
const popularitySort = "-metacritic";

describe("The Home Page", () => {
  beforeEach(() => {
    cy.landing();
    cy.dynamicSearchRequest(searchQuery, searchString);
    cy.sortQuery(popularitySort);
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.get(".chakra-image").should("be.visible");
    cy.get(".chakra-switch").siblings().contains("p", "Dark Mode");
  });

  it("fetches game data", () => {
    cy.wait("@getGames").then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body.results).to.have.length(3);
      cy.fixture("games.json").then((games) => {
        expect(interception.response?.body.results).to.deep.equal(
          games.results
        );
      });
    });
  });

  it("displays game cards", () => {
    cy.contains("h2", "The Witcher 3: Wild Hunt")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 92);
      });

    cy.contains("h2", "BioShock Infinite")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 94);
      });

    cy.contains("h2", "Hollow Knight")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 88);
      });
  });

  it("displays genre list", () => {
    cy.get("ul")
      .find("li")
      .should("have.length", 19)
      .eq(0)
      .should("contain", "Action")
      .next()
      .should("contain", "Indie");
  });

  it("only displays indie games, when filter is applied", () => {
    cy.contains("Indie").click();

    cy.wait("@getIndieGames")
      .its("request.url")
      .should("include", "&genres=51");

    cy.contains("h2", "Hollow Knight")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 88);
      });
  });

  it("only displays xbox platform games when filter is set", () => {
    cy.get("[data-cy='platform-selector']").click();
    cy.get("[data-cy='Xbox']").click();

    cy.wait("@getXboxPlatform")
      .its("request.url")
      .should("include", "&platforms=3");

    cy.contains("h2", "The Witcher 3: Wild Hunt")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 92);
      });

    cy.contains("h2", "BioShock Infinite")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 94);
      });

    cy.contains("h2", "Hollow Knight").should("not.exist");
  });

  it("searches for games", () => {
    cy.get("[data-cy='search']").click().type(searchString).submit();
    cy.wait("@searchGames")
      .its("request.url")
      .should("include", "&search=The+Witcher+3");

    cy.contains("h2", "The Witcher 3: Wild Hunt")
      .parent(".chakra-card__body")
      .within(() => {
        cy.contains("span", 92);
      });
    cy.contains("h2", "BioShock Infinite").should("not.exist");
    cy.contains("h2", "Hollow Knight").should("not.exist");
  });

  it("sorts by popularity", () => {
    cy.get("[data-cy='sort-selector']")
      .click()
      .get("div > button[value='-metacritic'")
      .click();
    cy.wait("@descendingSort")
      .its("request.url")
      .should("include", "&ordering=-metacritic");

    cy.get("[data-cy='game-grid']").children().should("have.length", 3);
    cy.get("[data-cy='game-grid']")
      .children()
      .first()
      .should("contain.text", 94)
      .next()
      .should("contain.text", 92)
      .next()
      .should("contain.text", 88);
  });

  it("displays a dynamic heading", () => {
    cy.get("[data-cy='Action']").click();
    cy.contains("Platforms").click();
    cy.contains("Xbox").click();
    cy.get("[data-cy='game-heading']").should(
      "contain.text",
      "Xbox Action Games"
    );
  });
});
