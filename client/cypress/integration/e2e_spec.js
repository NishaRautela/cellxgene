describe("did launch", () => {
  it("page launched", () => {
    cy.visit("/");
    cy.get("[data-testid='header']").contains("cellxgene: pbmc3k");
  });
});

describe("search for genes", () => {
  it("searches for known gene and adds to metadata", () => {
    let gene = "ACD";
    cy.visit("/");
    cy.get("[ data-testid='gene-search']").type(`${gene}{enter}`);
    cy.get(`[data-testid='histogram-${gene}']`);
  });
});
