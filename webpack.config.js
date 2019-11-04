const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

module.exports =
    (env, argv) => {

        const dev = argv.mode === 'development'
        const prod = argv.mode === 'production'

        let cssnano = prod ? require('cssnano') : () => { };

        let cssLoaderArray = [{
            loader: "css-loader",
            options: {
                importLoaders: 1,
                minimize: prod
            }
        },
        {
            loader: "postcss-loader",
            options: {
                plugins: (loader) => [
                    require('autoprefixer')
                    // , cssnano
                ]
            }
        }
        ]


        let config = {
            watch: dev,
            resolve: {
                alias: {
                    "@": path.resolve("./src/"),
                    "@css": path.resolve("./src/css/"),
                    "@js": path.resolve("./src/js/"),
                },
                extensions: ['.ts', '.js', '.json']
            },
            devtool: dev ? "cheap-module-eval-source-map" : "",
            module: {
                rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: cssLoaderArray
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [...cssLoaderArray, "sass-loader"]
                    })
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            useRelativePath: true,
                            publicPath: "./fonts/"
                        }
                    }]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            useRelativePath: true,
                            publicPath: "./img/"
                        }
                    }]
                }
                ]
            },
            plugins: [
                new ExtractTextPlugin({
                    filename: "[name].css"
                }),
                new CleanWebpackPlugin(path.resolve("./assets/"), {
                    root: path.resolve("./"),
                    verbose: true,
                    dry: false
                }),
                new CopyPlugin([
                    { from: './src/img', to: './img' },
                    { from: './src/svg', to: './svg' },
                ])
            ],
            output: {
                path: path.resolve("./assets/")
            }
        }

        return config;
    }