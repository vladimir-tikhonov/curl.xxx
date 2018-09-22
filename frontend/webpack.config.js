'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const ROOT_PATH = __dirname;
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ASSETS_PATH = path.resolve(ROOT_PATH, 'assets');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const isProductionBuild = process.env.NODE_ENV === 'production';

const webpackMode = () => ({
    mode: isProductionBuild ? 'production' : 'development',
});

const serveOptions = () => ({
    serve: {
        port: Number(process.env.WEBPACK_SERVE_PORT) || 8080,
        host: process.env.WEBPACK_SERVE_HOST || 'localhost',
        clipboard: false,
        hotClient: {
            port: Number(process.env.WEBPACK_SERVE_HOT_CLIENT_PORT) || 41565,
        },
    },
});

const sourceMaps = () => ({
    devtool: isProductionBuild ? false : 'source-map',
});

const entryPoint = () => ({
    entry: {
        bundle: path.join(SRC_PATH, 'index.tsx'),
    },
});

const output = () => ({
    output: {
        path: DIST_PATH,
    },
});

const resolveOptions = () => ({
    resolve: {
        modules: [ROOT_PATH, 'node_modules'],
        extensions: ['.js', '.ts', '.tsx', '.scss'],
    },
});

const typescriptLoader = () => ({
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [SRC_PATH],
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
});

const htmlGenerator = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online curl tool',
            template: path.resolve(ASSETS_PATH, 'index.template.html'),
        }),
    ],
});

const assetsCopy = () => ({
    plugins: [
        new CopyWebpackPlugin([
            { from: path.join(ASSETS_PATH, 'favicon.ico'), to: DIST_PATH },
        ]),
    ],
});

const externals = () => ({
    externals: [
        // unused import inside argparse package
        'fs',
    ],
});

module.exports = merge(
    webpackMode(),
    serveOptions(),
    sourceMaps(),
    entryPoint(),
    output(),
    resolveOptions(),
    typescriptLoader(),
    htmlGenerator(),
    assetsCopy(),
    externals()
);
