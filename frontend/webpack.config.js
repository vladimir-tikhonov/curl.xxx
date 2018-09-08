const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const SRC_PATH = path.resolve(__dirname, 'src');
const ASSETS_PATH = path.resolve(__dirname, 'assets');
const DIST_PATH = path.resolve(__dirname, 'dist');

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
    devtool: isProductionBuild ? false : 'eval-source-map',
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
        modules: [SRC_PATH, 'node_modules'],
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
            template: path.resolve(ASSETS_PATH, 'html', 'index.template.html'),
        }),
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
);
