require('ts-node/register');

const helpers = require('./helpers');

exports.config = {
    baseUrl: `http://localhost:${helpers.port.CLIENT}/`,

    specs: [
        helpers.pathFromRoot('e2e/**/*.e2e.ts')
    ],
    exclude: [],

    framework: 'mocha',

    allScriptsTimeout: 60000,

    mochaOpts: {
        reporter: 'spec',
        slow: 3000
    },
    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
        'args': ['show-fps-counter=true']
        }
    },

    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },

    useAllAngular2AppRoots: true
};
