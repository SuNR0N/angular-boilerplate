const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = helpers.env.DEVELOPMENT;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || helpers.port.CLIENT;
const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV
});

// Webpack Configuration
module.exports = function (options) {
    return webpackMerge(commonConfig({ env: ENV }), {
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
            // TODO
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
                    target: `http://localhost:${helpers.port.BACKEND}`,
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