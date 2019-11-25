const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    entry: ['./src/index.js' , "./src/scss/style.scss"],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'js/index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "./src/scss/"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|jpg|eot)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:4].[ext]",
                        outputPath: "images/"
                    }
                }
            }
        ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.min.css"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.output = {
            path: path.join(__dirname, '/dist'),
            filename: 'js/index_bundle.[contentHash:4].min.js'
        };
        config.plugins.shift();
        config.plugins.push(new CleanWebpackPlugin());
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/style.[contentHash:4].min.css"
            })
        )
    }
    return config;
};
