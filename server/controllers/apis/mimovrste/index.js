const mimovrsteServices = require('../../../services/mimovrste')();

const save = async (req, res) => {
  const { url } = req.body;
  try {
    const result = await mimovrsteServices.saveToDatabase(url);
    if (result) res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500);
  }

  return res.redirect('/mimovrste');
};

const getProductInfo = async (req, res) => {

};

module.exports = { save, getProductInfo };
