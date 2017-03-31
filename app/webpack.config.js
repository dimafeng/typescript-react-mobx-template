const webpack = require('webpack');
const merge = require('webpack-merge');
const commons = require('./webpack.commons.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8888";

module.exports = merge(commons, {
    entry: [
        './scripts/index.tsx',
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        `webpack/hot/only-dev-server`
    ],
    devtool: 'source-map',
    module: {
        preLoaders: [
            {
                test: /\.ts[x]*$/,
                loader: "tslint"
            }
        ]
    },
    tslint: {
        failOnHint: false //true?
    },
    devServer: {
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                {from: /^(?!css|js|[^\\.]*\\.hot-update\\.json)/, to: '/index.html'}
            ]
        },
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ]
});
