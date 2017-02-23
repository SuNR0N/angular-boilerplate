const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

// Webpack Constants
const AOT = helpers.isAOT();
const HMR = helpers.isHMR();
const METADATA = {
    title: 'Boilerplate Angular CRUD Application',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

// Webpack Configuration
module.exports = function (options) {
    return {
        entry: {
            polyfills: './src/polyfills.ts',
            main: AOT ? './src/main-aot.ts' : './src/main-jit.ts'
        },
        resolve: {
            extensions: [ 
                '.ts', 
                '.js', 
                '.json' 
            ],
            modules: [
                helpers.pathFromRoot('src'),
                helpers.pathFromRoot('node_modules')
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        { 
                            loader: 'ng-router-loader',
                            options: {
                                loader: 'async-import',
                                genDir: 'aot',
                                aot: AOT
                            }
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.webpack.json'
                            }
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [ /\.(spec|e2e)\.tsx?$/ ]
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.css$/,
                    use: [ 
                        'to-string-loader', 
                        'css-loader' 
                    ],
                    exclude: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'to-string-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                    exclude: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: [ 'polyfills' ]
            }),
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: [ 'main' ],
                minChunks: module => /node_modules/.test(module.resource)
            }),
            new CommonsChunkPlugin({
                name: [ 'polyfills', 'vendor' ].reverse()
            }),
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.pathFromRoot('src')
            ),
            new CopyWebpackPlugin([
                {
                    from: 'src/assets',
                    to: 'assets'
                }
            ]),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA
            }),
            new ngcWebpack.NgcWebpackPlugin({
                disabled: !AOT,
                tsConfig: helpers.pathFromRoot('tsconfig.webpack.json')
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}