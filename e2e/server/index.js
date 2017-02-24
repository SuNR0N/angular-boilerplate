const cfg = require('../../config/configuration');

const backendServer = require('./server');

const PORT = process.env.PORT || cfg.Port.BACKEND;

backendServer(PORT);