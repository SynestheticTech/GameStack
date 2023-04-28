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
      expect(interception.response?.body).to.have.length(2);
      cy.fixture("games.json").then((games) => {
        expect(interception.response?.body).to.deep.equal(games);
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
  });
});
