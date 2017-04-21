const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('/node_modules/') >= 0;
}

module.exports = {
    context: path.join(__dirname, './src'),
    entry: ['./scripts/index.tsx'],
    output: {
        path: path.join(__dirname, 'out', 'public'),
        filename: 'js/app.min.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components|__tests__)/,
                loaders: ['react-hot-loader/webpack', 'ts-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css!sass?sourceMap=true")
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].min.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendor.min.js',
            minChunks: function (module) {
                return isExternal(module);
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        })
    ]
};
