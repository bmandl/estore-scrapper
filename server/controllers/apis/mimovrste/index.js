const puppeteer = require('puppeteer');

const add = async (req, res) => {
  let { url } = req.body;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const itemInfo = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.resourceType() === 'xhr' && request.url().includes('/api/product/find-variants?')) url = request.url();
    request.continue();
  });

  try {
    await page.goto(
      url,
      { waitUntil: 'networkidle2' },
    );
  } catch (err) {
    console.error(err);
    res.status(500);
  }

  itemInfo.on('response', async (response) => {
    const data = await response.json();

    res.json({
      Artikel: data.entities[0].title, Cena: `${data.entities[0].defaultActualPrice}€`, 'Prvotna cena': `${data.entities[0].priceRrp}€`, Popust: `${data.entities[0].discountPrice}%`,
    });
  });

  try {
    await itemInfo.goto(url, { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
  res.end();
};

module.exports = { add };
