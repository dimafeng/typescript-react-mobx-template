const webpack = require('webpack');
const merge = require('webpack-merge');
const commons = require('./webpack.commons.js');
const failPlugin = require('webpack-fail-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(commons, {
    output: {
        publicPath: '/public/'
    },
    plugins: [
        new CleanWebpackPlugin(['out']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        failPlugin
    ]
});
