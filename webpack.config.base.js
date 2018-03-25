const webpack = require('webpack');

const path = require('path');

module.exports = {
    entry: {
        main: './app/main.jsx'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],

        alias: {
            '@': path.join(__dirname, 'app'),
            '#config$': path.join(__dirname, 'config'),
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: [/node_modules/]
        },
        {
            test: /\.(js|jsx)?$/,
            use: 'es3ify-loader',
            enforce: 'post',
            exclude: [/node_modules/]
        }

        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks(module, count) {
                return module.resource && (/base.css/).test(module.resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
                return module.resource && (/node_modules/).test(module.resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest']
        })
    ],

};
