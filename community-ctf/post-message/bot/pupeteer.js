const puppeteer = require('puppeteer');
const fs = require('fs');
const flag = fs.readFileSync('./flag.txt', 'utf-8');

var browser = null;

(async function init() {
  browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    product: 'firefox',
  });
})();

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  });
}

async function visit(visitUrl) {
  let page = await browser.newPage();
  await page.goto('https://pm-ctf.drstra.in', { timeout: 3000, waitUntil: 'domcontentloaded' });
  await page.evaluate(flag => { localStorage.setItem('secret', flag) }, flag); // Store flag to localStorage secret
  await page.goto(visitUrl, { timeout: 3000, waitUntil: 'domcontentloaded' });
  await sleep(6000);
}

module.exports = { visit }
