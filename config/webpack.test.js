const helpers = require('./helpers');
const cfg = require('./configuration');

// Webpack Plugins
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = cfg.Env.TEST;

// Webpack Configuration
module.exports = function (options) {
    return {
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [ 
                helpers.pathFromRoot('src'), 
                helpers.pathFromRoot('node_modules')
            ],
            alias: {
                sinon: 'sinon/pkg/sinon'
            }
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: [
                        helpers.pathFromRoot('node_modules/rxjs'),
                        helpers.pathFromRoot('node_modules/@angular')
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            query: {
                                sourceMap: false,
                                inlineSourceMap: true
                            }
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [ /\.e2e\.tsx?$/ ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    test: /\.css$/,
                    loader: [
                        'to-string-loader', 
                        'css-loader'
                    ],
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    test: /\.scss$/,
                    loader: [
                        'raw-loader', 
                        'sass-loader'
                    ],
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    enforce: 'post',
                    test: /\.(js|tsx?)$/,
                    loader: 'istanbul-instrumenter-loader',
                    include: helpers.pathFromRoot('src'),
                    exclude: [
                        /\.(e2e|spec)\.tsx?$/,
                        /node_modules/
                    ]
                }
            ]
        },
        plugins: [
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.pathFromRoot('src')
            )
        ],
        performance: {
            hints: false
        },
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}