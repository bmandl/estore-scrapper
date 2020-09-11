const mimovrsteServices = require('../../../services/mimovrste');

const add = async (req, res) => {
  const { url } = req.body;
  const xhrRequest = await mimovrsteServices.getProductXHRrequest(url);
  const productInfo = await mimovrsteServices.getProductInfo(xhrRequest);

  res.json(productInfo);
};

module.exports = { add };
