const puppeteer = require('puppeteer');

const getProductXHRrequest = async (itemUrl) => {
  let requestUrl;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.resourceType() === 'xhr' && request.url().includes('/api/product/find-variants?')) requestUrl = request.url();
    request.continue();
  });

  try {
    await page.goto(
      itemUrl,
      { waitUntil: 'networkidle2' },
    );
  } catch (err) {
    console.error(err);
  }

  await browser.close();
  if (requestUrl) { return requestUrl; }
  return null;
};

const getProductInfo = async (xhrRequest) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let productInfo;

  page.on('response', async (response) => {
    const data = await response.json();
    productInfo = {
      Artikel: data.entities[0].title, Cena: `${data.entities[0].defaultActualPrice}€`, 'Prvotna cena': `${data.entities[0].priceRrp}€`, Popust: `${data.entities[0].discountPrice}%`,
    };
  });

  try {
    await page.goto(xhrRequest, { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error(err);
  }
  return productInfo;
};

module.exports = { getProductXHRrequest, getProductInfo };
