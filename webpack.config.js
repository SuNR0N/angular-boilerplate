const helpers = require('./config/helpers');
const ENV = helpers.env;

switch (process.env.NODE_ENV) {
    case ENV.PROD:
    case ENV.PRODUCTION:
        module.exports = require('./config/webpack.prod')({ env: ENV.PRODUCTION });
        break;
    case ENV.TEST:
        module.exports = require('./config/webpack.test')({ env: ENV.TEST });    
    case ENV.DEV:
    case ENV.DEVELOPMENT:
    default:
        module.exports = require('./config/webpack.dev')({ env: ENV.DEVELOPMENT });
}