const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd ? "js/main.[contenthash].js" : "js/main.js",
    publicPath: "",
    // ADDED: built-in cleaner replaces CleanWebpackPlugin
    clean: true,
    // ADDED: control where emitted assets go
    assetModuleFilename: "assets/[name][contenthash][ext][query]",
  },

  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "inline-source-map",
  stats: "errors-only",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
    historyApiFallback: true,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../", // 👈 makes CSS assets resolve correctly from /css/ to /assets/
      },
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
      },
    },
    "postcss-loader",
  ],
},

      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              { tag: "img", attribute: "src", type: "src" },
              { tag: "img", attribute: "srcset", type: "srcset" },
              { tag: "source", attribute: "srcset", type: "srcset" },
              { tag: "link", attribute: "href", type: "src" }, // e.g., icons
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|ico|woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
    // new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name].[contenthash].css" : "css/[name].css",
    }), 
  ],
  resolve: {
    extensions: [".js", ".json"],
},
};
