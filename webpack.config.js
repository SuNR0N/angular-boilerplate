const cfg = require('./config/configuration');

switch (process.env.NODE_ENV) {
    case cfg.Env.PROD:
    case cfg.Env.PRODUCTION:
        module.exports = require('./config/webpack.prod')({ env: cfg.Env.PRODUCTION });
        break;
    case cfg.Env.TEST:
        module.exports = require('./config/webpack.test')({ env: cfg.Env.TEST });    
    case cfg.Env.DEV:
    case cfg.Env.DEVELOPMENT:
    default:
        module.exports = require('./config/webpack.dev')({ env: cfg.Env.DEVELOPMENT });
}