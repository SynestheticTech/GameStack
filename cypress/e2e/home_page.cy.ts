describe("The Home Page", () => {
  beforeEach(() => {
    cy.landing();
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

  it("fetches genres", () => {
    cy.wait("@getGenres").then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
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
      .should("have.length", 2)
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
    cy.contains("Platforms").click();
    cy.contains("Xbox").click();

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
});
