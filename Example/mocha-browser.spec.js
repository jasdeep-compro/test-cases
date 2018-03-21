const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
    headless: true,
    timeout: 1000000,
    slowMo: 80
};

// expose variables
before(async function () {
    global.expect = expect;
    global.browser = await
    puppeteer.launch(opts);
});


describe('sample test-1', function () {

    let page;

    before (async function () {
        this.timeout(0);
      page = await browser.newPage();
      await page.goto('http://localhost:4800');

    });

    afterEach(async function() {

        // On each Failing test take a screen shoot
        if (this.currentTest.state == 'failed') {
            let filename= "failure_"+this.currentTest.fullTitle()+".jpeg";
            await page.screenshot({path: filename});
        }
    });

    it('row count', async function () {
      const rowCount = await page.$eval(".k-spreadsheet-row-header", el => (el ? el.children.length : false));

      expect(rowCount).to.eql(4);
    });

    it('col count', async function () {
        const rowCount = await page.$eval(".k-spreadsheet-column-header", el => (el ? el.children.length : false));
        expect(rowCount).to.eql(5);

    });

    it("test sheet count", async () => {
        let sheetCount = await page.$eval(".k-tabstrip-items", el => (el ? el.children.length : false));
        expect(sheetCount).to.eql(2);
    });

    it("test add new sheet", async () => {

        await page.click(".k-spreadsheet-sheets-bar-add");
        let sheetCount = await page.$eval(".k-tabstrip-items", el => (el ? el.children.length : false));
        expect(sheetCount).to.eql(3);
    });
});
