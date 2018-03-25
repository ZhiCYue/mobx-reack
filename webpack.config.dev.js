const path = require('path');

const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('./config');

module.exports = merge(baseConfig, {
    devtool: 'eval',
    output: {
        filename: 'js/[name].[chunkhash:7].js',
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
        new HtmlWebpackPlugin({
            filename: 'templates/index.html',
            template: './app/templates/index.html',
            favicon: './favicon.ico'
        }),
    ]
});
