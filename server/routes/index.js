const mimovrsteRoute = require('./mimovrste');
const homeRoute = require('./home');
const apiRoute = require('./apis');

const init = (server) => {
  server.get('*', (req, res, next) => next());

  server.get('/', (req, res) => {
    res.redirect('/home');
  });

  server.use('/api', apiRoute);
  server.use('/home', homeRoute);
  server.use('/mimovrste', mimovrsteRoute);
};

module.exports = {
  init,
};
