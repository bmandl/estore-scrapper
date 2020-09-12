const { mongoose } = require('../../database');

const itemSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Item = mongoose.model('Items', itemSchema);

module.exports = Item;
