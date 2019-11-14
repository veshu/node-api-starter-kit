Promise = require('bluebird'); // eslint-disable-line no-global-assign
const config = require('config');

const app = require('./common/express');
const logger = require('./common/logger');
const mongoose = require('./common/mongoose');

const { port, env } = config;

// open mongoose connection
mongoose.connect();

app.listen(port, () => { logger.info(`server started on port ${port} (${env})`); });

/**
* Exports express
* @public
*/
module.exports = app;
