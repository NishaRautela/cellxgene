import puppeteer from "puppeteer";

const appUrlBase = "http://localhost:3000";

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
});

afterAll(() => {
  if (!process.env.DEBUG) {
    browser.close();
  }
});

let getOneElementInnerHTML = async function(selector) {
  let text = await page.$eval(selector, el => el.innerHTML);
  return text;
};

describe("did launch", () => {
  test("page launched", async () => {
    await page.goto(appUrlBase);
    let el = await getOneElementInnerHTML("[data-testid='header']");
    expect(el).toBe("cellxgene: pbmc3k");
  });
});

describe("search for genes", () => {
  test("search for known gene and add to metadata", async () => {
    await page.goto(appUrlBase);
    await page.waitForSelector("[ data-testid='gene-search']");
    // blueprint's  typeahead is treating typing weird, clicking first solves this
    await page.click("[data-testid='gene-search']");
    await page.type("[data-testid='gene-search']", "ACD");
    await page.focus("[data-testid='gene-search']");
    await page.keyboard.press("Enter");
    await page.waitForSelector("[data-testid='histogram-ACD']");
  });
});
