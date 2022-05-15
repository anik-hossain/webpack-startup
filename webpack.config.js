const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');
const glob = require('glob');

function entryGenerator(pathName) {
    return glob.sync(pathName).reduce((entries, entry) => {
        const entryName = path.parse(entry).name;
        entries[entryName] = entry;
        return entries;
    }, {});
}

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        clean: true,
    },
};

const jsConfig = Object.assign({}, config, {
    name: 'javaScriptFiles',
    entry: entryGenerator('./src/js/*'),
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
    name: 'htmlFiles',
    module: {
        rules: [{ test: /\.html$/, use: 'html-loader' }],
    },
    plugins: [
        new webpackRemoveEmptyScripts({ extensions: /\.js$/ }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new htmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
        }),
        new htmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            chunks: ['about[contenthash].js'],
        }),
    ],
});

const cssConfig = Object.assign({}, config, {
    name: 'cssFiles',
    entry: entryGenerator('./src/styles/*'),
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

const mediaFilesConfig = Object.assign({}, config, {
    name: 'MediaFiles',
    entry: path.resolve(__dirname, './src/scripts/images.js'),
    output: {
        path: path.resolve(__dirname, 'dist/images'),
        clean: true,
        // filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [new webpackRemoveEmptyScripts({ extensions: /\.js$/ })],
});

module.exports = [cssConfig, htmlConfig, jsConfig, mediaFilesConfig];
