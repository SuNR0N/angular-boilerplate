const helpers = require('../../config/helpers');

const backendServer = require('./server');

const PORT = process.env.PORT || helpers.port.BACKEND;

backendServer(PORT);