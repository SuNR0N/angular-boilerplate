const path = require('path');

const TARGET = process.env.npm_lifecycle_event || '';
const ROOT = path.resolve(__dirname, '..');
const ENVIRONMENTS = {
    DEV: 'dev',
    DEVELOPMENT: 'development',
    TEST: 'test',
    PROD: 'prod',
    PRODUCTION: 'production'
};
const PORTS = {
    BACKEND: 3001,
    CLIENT: 3000,
    WEB_SERVER: 8080
};
const NPM_TARGET_VARS = {
    AOT: 'aot'
};

function npmTargetContains (value) {
    return TARGET.includes(value);
};

function pathFromRoot (...pathSegments) {
    return path.join(ROOT, pathSegments.join(''));
};

function isAOT () {
    return npmTargetContains(NPM_TARGET_VARS.AOT);
};

module.exports = {
    env: ENVIRONMENTS,
    port: PORTS,
    pathFromRoot,
    isAOT
};