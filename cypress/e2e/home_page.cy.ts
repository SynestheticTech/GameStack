describe("The Home Page", () => {
  beforeEach(() => {
    cy.landing();
  });

  it("successfully loads", () => {
    cy.visit("/");
    cy.get(".chakra-image").should("be.visible");
    cy.get(".chakra-switch").siblings().contains("p", "Dark Mode");

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
