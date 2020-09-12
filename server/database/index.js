const mongoose = require('mongoose');

const connect = () => {
  try {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { mongoose, connect };
