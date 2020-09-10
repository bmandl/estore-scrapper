const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes');

module.exports = () => {
  const server = express();
  server.use(logger('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(express.static(path.join(__dirname, 'public')));

  const create = (config) => {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    // Returns middleware that parses json
    server.use(bodyParser.json());
    routes.init(server);
  };

  const start = () => {
    const hostname = server.get('hostname');
    const port = server.get('port');

    server.listen(port, () => {
      console.log(`Express server listening on - http://${hostname}:${port}`);
    });
  };
  return { create, start };
};
