const webpack = require('webpack');
const helpers = require('./helpers');

// Webpack Plugins
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
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
            vendor: './src/vendor.ts',
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
                                configFileName: AOT ? 'tsconfig.aot.json' : 'tsconfig.jit.json'
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
                    use: ['raw-loader'],
                    exclude: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'raw-loader',
                        'sass-loader'
                    ],
                    exclude: [ helpers.pathFromRoot('src', 'styles') ]
                },
                {
                    test: /initial\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!sass-loader?sourceMap'
                    })
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                },
                {
                    test: /bootstrap\/dist\/js\/umd\//,
                    use: 'imports-loader?jQuery=jquery'
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [ helpers.pathFromRoot('src/index.html') ]
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'initial.css',
                allChunks: true
            }),
            new TypedocWebpackPlugin(
                {
                    out: helpers.pathFromRoot('docs'),
                    exclude: '**/*+(spec|main-' + (AOT ? 'jit' : 'aot') + ').ts'
                },
                helpers.pathFromRoot('src')
            ),
            new CheckerPlugin(),
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules/.test(module.resource)
            }),
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
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
            new LoaderOptionsPlugin({}),
            new ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Tether: "tether",
                "window.Tether": "tether",
                Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
                Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
                Button: "exports-loader?Button!bootstrap/js/dist/button",
                Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
                Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
                Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
                Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
                Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
                Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
                Util: "exports-loader?Util!bootstrap/js/dist/util"
            }),
            new ngcWebpack.NgcWebpackPlugin({
                disabled: !AOT,
                tsConfig: helpers.pathFromRoot('tsconfig.aot.json')
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