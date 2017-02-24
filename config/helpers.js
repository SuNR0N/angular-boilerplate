const path = require('path');
const cfg = require('./configuration');

const TARGET = process.env.npm_lifecycle_event || '';
const ROOT = path.resolve(__dirname, '..');

function npmTargetContains (value) {
    return TARGET.includes(value);
};

function isNodeTarget (value) {
    const targetPathSegments = process.argv[1].split(path.sep);
    const target = targetPathSegments[targetPathSegments.length - 1];

    return target === value;
};

function hasArgumentForNodeTarget (value) {
    const args = process.argv.slice(2);

    return args.join('').includes(value);
};

function pathFromRoot (...pathSegments) {
    return path.join(ROOT, pathSegments.join(''));
};

function isAOT () {
    return npmTargetContains(cfg.NpmTargetVariable.AOT);
};

function isHMR () {
    return hasArgumentForNodeTarget(cfg.NodeExecutableArgument.HOT);
}

function isWebpackDevServer () {
    return isNodeTarget(cfg.NodeExecutable.WEBPACK_DEV_SERVER);
};

module.exports = {
    pathFromRoot,
    isAOT,
    isHMR,
    isWebpackDevServer
};