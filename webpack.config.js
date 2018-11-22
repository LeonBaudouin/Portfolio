const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

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
                    require('autoprefixer')({
                        browsers: ["last 2 versions"]
                    }),
                    cssnano
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
                    "@img": path.resolve("./src/img/"),
                    "@svg": path.resolve("./src/svg/"),
                    "@js": path.resolve("./src/js/"),
                },
                extensions: ['.ts', '.js', '.json']
            },
            devtool: dev ? "cheap-module-eval-source-map" : "source-map",
            module: {
                rules: [{
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: prod,
                            removeComments: prod
                        }
                    }
                },
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
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "[name].[ext]",
                            outputPath: "img/",
                            publicPath: "img/"
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            enabled: prod
                        }
                    }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            useRelativePath: true,
                            publicPath: "../fonts/"
                        }
                    }]
                },
                {
                    test: /\.svg$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: "[name].svg",
                            outputPath: "svg/",
                            publicPath: "svg/"
                        }
                    }]
                }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./src/index.html"
                }),
                new ExtractTextPlugin({
                    filename: "css/[name].css"
                }),
                new CleanWebpackPlugin(path.resolve("./dist/"), {
                    root: path.resolve("./"),
                    verbose: true,
                    dry: false
                })
            ]
        }

        return config;
    }