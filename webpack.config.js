
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
    mode: isDev ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env"
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            config: config.template,
            // minify: {
            //     removeAttributeQuotes: false,
            //     collapseWhitespace: false
            // },
            // hash: true // 默认false
        })
    ],
    devServer: {
        port: '3000',
        quiet: false,
        inline: true,
        stats: 'errors-only',
        overlay: false,
        clientLogLevel: 'silent',
        compress: true,
    }
}