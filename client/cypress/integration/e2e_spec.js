beforeEach(function() {
  cy.visit("/");
});

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
    cy.get("[data-testid='gene-search']").type(`${gene}{enter}`);
    cy.get(`[data-testid='histogram-${gene}']`);
  });
});

describe("select cells and diffexp", function() {
  beforeEach(function() {
    cy.get("[data-testid='layout-overlay']").as("layout");
    cy.get("@layout")
      .invoke("width")
      .as("width");
    cy.get("@layout")
      .invoke("height")
      .as("height");
  });
  it("selects cells from layout and adds to cell set 1", function() {
    console.log(this.width, this.height);
    const cellset1 = {
      x1: Math.floor(this.width * 0.25),
      x2: Math.floor(this.width * 0.29),
      y1: Math.floor(this.height * 0.25),
      y2: Math.floor(this.height * 0.29)
    };
    cy.get("[data-testid='layout-overlay']")
      .trigger("mousedown", cellset1.x1, cellset1.y1, {
        which: 1,
        force: true,
        view: window
      })
      .trigger("dragstart")
      .trigger("drag")
      .trigger("mouseup", cellset1.x2, cellset1.y2, {
        which: 1,
        force: true,
        view: window
      });
    cy.get("[data-testid='cellset_button_1").click();
    // .trigger("mousedown", cellset1.x1, cellset1.y1);
    // .trigger("mouseup", cellset1.x2, cellset1.y2);
    // console.log(this.width);
    // click and drag
    //get cellset button and click
    // assert it changes number
  });
});

describe("brush histogram", () => {});
