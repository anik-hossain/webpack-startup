const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');

const config = {
    mode: 'development',
    // entry: path.resolve(__dirname, 'src/scripts/index.js'),
    // output: {
    //     path: path.resolve(__dirname, 'dist/js'),
    //     filename: 'app.js',
    //     clean: true,
    // },
};

const jsConfig = Object.assign({}, config, {
    entry: {
        bundle: path.resolve(__dirname, 'src/scripts/index.js'),
        app: path.resolve(__dirname, 'src/scripts/test2.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
});

const htmlConfig = Object.assign({}, config, {
    // output: {
    //     path: path.resolve(__dirname, 'dist/css'),
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

// module.exports = {

//     entry: {
//         app: path.resolve(__dirname, 'src/scripts/index.js'),
//         test: path.resolve(__dirname, 'src/scripts/test2.js'),
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist/js'),
//     },
//     module: {
//         rules: [
//             // {
//             //     test: /\.(scss|css)$/,
//             //     use: {
//             //         loader: [
//             //             MiniCssExtractPlugin.loader,
//             //             'css-loader',
//             //             'sass-loader',
//             //         ],
//             //         options: {},
//             //     },
//             // },
//             {
//                 test: /\.html$/,
//                 use: 'html-loader',
//             },
//         ],
//     },
//     plugins: [
//         // new MiniCssExtractPlugin({
//         //     filename: '[name].css',
//         //     chunkFilename: '[id].css',
//         // }),
//         new htmlWebpackPlugin({
//             template: './src/about.html',
//             filename: 'about.html',
//         }),
//     ],
// };
