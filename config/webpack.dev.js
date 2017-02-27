const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const helpers = require('./helpers');
const cfg = require('./configuration');
const commonConfig = require('./webpack.common');

// Webpack Plugins
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = cfg.Env.DEVELOPMENT;
const HOST = process.env.HOST || cfg.Host.LOCALHOST;
const PORT = process.env.PORT || cfg.Port.CLIENT;
const HMR = helpers.isHMR();
const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

// Webpack Configuration
module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'cheap-module-source-map',
        output: {
            path: helpers.pathFromRoot('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[id].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                configFile: 'tslint.json'
                            }
                        }
                    ],
                    exclude: [ /\.(spec|e2e)\.tsx?$/ ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                    include: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                    include: [ helpers.pathFromRoot('src', 'styles') ]
                }
            ]
        },
        plugins: [
            new DllBundlesPlugin({
                bundles: {
                    polyfills: [
                        'core-js',
                        {
                            name: 'zone.js',
                            path: 'zone.js/dist/zone.js'
                        },
                        {
                            name: 'zone.js',
                            path: 'zone.js/dist/long-stack-trace-zone.js'
                        }
                    ],
                    vendor: [
                        '@angular/common',
                        '@angular/core',
                        '@angular/forms',
                        '@angular/http',
                        '@angular/platform-browser',
                        '@angular/platform-browser-dynamic',
                        '@angular/router',
                        'rxjs'
                    ]
                },
                dllDir: helpers.pathFromRoot('dll'),
                webpackConfig: webpackMergeDll(commonConfig({ env: ENV }), {
                    devtool: 'cheap-module-source-map',
                    plugins: []
                })
            }),
            new AddAssetHtmlPlugin([
                { filepath: helpers.pathFromRoot(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
                { filepath: helpers.pathFromRoot(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
            ])
        ],
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            proxy: {
                '/api/*': {
                    target: `http://localhost:${cfg.Port.BACKEND}`,
                    secure: false
                }
            }
        },
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};