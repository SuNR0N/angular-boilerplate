const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

// Webpack Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = helpers.env.PRODUCTION;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || helpers.port.WEB_SERVER;
const METADATA = webpackMerge(commonConfig({ 
    env: ENV 
}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV
});

// Webpack Configuration
module.exports = function (options) {
    return webpackMerge(commonConfig({ 
        env: ENV 
    }), {
        output: {
            path: helpers.pathFromRoot('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }),
                    include: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader'
                    }),
                    include: [ helpers.pathFromRoot('src', 'styles') ]
                }
            ]
        },
        plugins: [
            new OptimizeJsPlugin({
                sourceMap: false
            }),
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new UglifyJsPlugin({
                beautify: false,
                output: {
                    comments: false
                },
                mangle: {
                    screw_ie8: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false // we need this for lazy v8
                }
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};