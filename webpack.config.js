const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/js/noScript.js'),
    // output: {
    //     path: path.resolve(__dirname, 'dist/noscript'),
    //     filename: 'app.js',
    //     clean: true,
    // },
};

const jsConfig = Object.assign({}, config, {
    entry: {
        bundle: './src/scripts/index.js',
        app: './src/scripts/test2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
});

const htmlConfig = Object.assign({}, config, {
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].html',
    //     clean: true,
    // },
    module: {
        rules: [{ test: /\.html$/, use: 'html-loader' }],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            publicPath: path.resolve(__dirname, 'dist'),
        }),
        new htmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            publicPath: path.resolve(__dirname, 'dist'),
        }),
        new htmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            publicPath: path.resolve(__dirname, 'dist'),
        }),
    ],
});

const cssConfig = Object.assign({}, config, {
    name: 'css',
    entry: {
        global: path.resolve(__dirname, 'src/styles/global.scss'),
        header: path.resolve(__dirname, 'src/styles/header.scss'),
        app: path.resolve(__dirname, 'src/styles/index.css'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/css'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new webpackRemoveEmptyScripts(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:6].css',
            chunkFilename: '[id].css',
        }),
    ],
});

module.exports = [cssConfig, htmlConfig, jsConfig];
