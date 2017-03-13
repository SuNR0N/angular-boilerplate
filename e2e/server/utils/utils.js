const chalk = require('chalk');

const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
};

const Logger = {
    warn: function (message) {
        console.log(chalk.yellow('[WARN] ' + message));
    },
    error: function (message) {
        console.log(chalk.red('[ERROR] ' + message));
    },
    info: function (message) {
        console.log(chalk.cyan('[INFO] ' + message));
    },
    success: function (message) {
        console.log(chalk.green('[SUCCESS] ' + message));
    }
}

module.exports = {
    HttpStatus,
    Logger
};