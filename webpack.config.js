const path = require('path');

const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('./config');

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = merge(baseConfig, {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 8080
    },
    output: {
        filename: 'js/[name].[hash:7].js',
        path: path.join(__dirname, 'dist'),
        publicPath: (config.staticDomain || '').endsWith('/') ? config.staticDomain : `${config.staticDomain}/`
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            minimize: true
                        }
                    }
                })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            minimize: true,
                            localIdentName: '[name]-[local]-[hash:base64:8]',
                        }
                    }
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.less?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[chunkhash:7].css'),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'templates/index.html',
            template: './app/templates/index.html',
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/dist/templates/index.html' })
    ]
});
