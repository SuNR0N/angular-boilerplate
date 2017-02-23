const environments = {
    DEV: 'dev',
    DEVELOPMENT: 'development',
    TEST: 'test',
    PROD: 'prod',
    PRODUCTION: 'production'
};

const hosts = {
    LOCALHOST: 'localhost'
};

const ports = {
    BACKEND: 3001,
    CLIENT: 3000,
    WEB_SERVER: 8080
};

const npmTargetVariables = {
    AOT: 'aot'
};

const nodeExecutables = {
    WEBPACK_DEV_SERVER: 'webpack-dev-server'
};

const nodeExecutableArguments = {
    HOT: 'hot'
};

module.exports = {
    Env: environments,
    Host: hosts,
    NodeExecutable: nodeExecutables,
    NodeExecutableArgument: nodeExecutableArguments,
    NpmTargetVariable: npmTargetVariables,
    Port: ports
};