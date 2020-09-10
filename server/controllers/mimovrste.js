const path = require('path');

const index = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/mimovrste.html'));
};

module.exports = { index };
