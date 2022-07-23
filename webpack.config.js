const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            enums: path.resolve(__dirname, 'src/enums/'),
            maps: path.resolve(__dirname, 'src/maps/'),
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Getting Started',
            template: 'template/index.html',
            templateParameters: {
                id: 'app',
            },
        }),
        new CleanWebpackPlugin(),
    ]
};
