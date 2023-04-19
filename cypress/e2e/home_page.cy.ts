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
});
