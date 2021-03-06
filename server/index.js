const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes');
const database = require('./database');
require('dotenv').config();

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
    database.connect();
    const db = database.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      server.listen(port, () => {
        console.log(`Express server listening on - http://${hostname}:${port}`);
      });
    });
  };
  return { create, start };
};
