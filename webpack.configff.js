const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');

let config = {
    mode: 'development',
    // entry: {
    //     bundle: path.resolve(__dirname, 'src/scripts/index.js'),
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist/js'),
    //     filename: '[name].[contenthash].js',
    //     clean: true,
    // },
    // devServer: {
    //     static: {
    //         directory: path.resolve(__dirname, 'dist'),
    //     },
    //     open: true,
    //     port: 3000,
    //     compress: true,
    //     historyApiFallback: true,
    // },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // }),
        new htmlWebpackPlugin({
            title: 'Webpack app',
            filename: 'index.html',
            template: 'src/contact.html',
        }),
    ],
};

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
    plugins: [
        new webpackRemoveEmptyScripts(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:6].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
});

// const htmlConfig = Object.assign({}, config, {
//     name: 'html',
//     entry: {
//         index: path.resolve(__dirname, 'src/index.html'),
//         about: path.resolve(__dirname, 'src/about.html'),
//         contact: path.resolve(__dirname, 'src/contact.html'),
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         clean: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.html$/,
//                 use: 'html-loader',
//                 // exclude: path.resolve(__dirname, 'src/index.html'),
//             },
//         ],
//     },
//     plugins: [
//         new webpackRemoveEmptyScripts(),
//         new htmlWebpackPlugin({
//             title: 'Webpack app',
//             filename: 'index.html',
//             template: 'src/index.html',
//         }),
//     ],
// });

// module.exports = {
//     mode: 'development',
//     entry: {
//         bundle: path.resolve(__dirname, 'src/scripts/index.js'),
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist/js'),
//         filename: '[name].[contenthash].js',
//         clean: true,
//     },
//     devServer: {
//         static: {
//             directory: path.resolve(__dirname, 'dist'),
//         },
//         open: true,
//         port: 3000,
//         compress: true,
//         historyApiFallback: true,
//     },
//     devtool: 'source-map',
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: '[name].css',
//             chunkFilename: '[id].css',
//         }),
//         new htmlWebpackPlugin({
//             title: 'Webpack app',
//             filename: 'index.html',
//             template: 'src/index.html',
//         }),
//     ],
// };

module.exports = [cssConfig];
