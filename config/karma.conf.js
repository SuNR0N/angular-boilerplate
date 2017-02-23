const cfg = require('./configuration');

const ENV = cfg.Env.TEST;

module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test')({ env: ENV });

  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      {
        pattern: './karma-test-shim.js',
        watched: false
      },
      {
        pattern: '../src/assets/**/*',
        watched: false,
        served: true
      }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './karma-test-shim.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: testWebpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage', 'remap-coverage'],

    coverageReporter: { 
      type: 'in-memory' 
    },

    remapCoverageReporter: {
        'text-summary': null,
        html: './coverage/html',
        json: './coverage/coverage.json'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  config.set(configuration);
}
