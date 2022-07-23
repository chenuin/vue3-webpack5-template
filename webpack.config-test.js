const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    target: 'node',  // webpack should compile node compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: 'inline-cheap-module-source-map',
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
    ],
};
