const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const env = process.env.NODE_ENV;
const optimizePlugins =
  env === "production"
    ? [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJSPlugin({
          sourceMap: true
        })
      ]
    : [];


const mode = env === "production" ? "production" : "development";

module.exports = {
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].bundle.js",
  },
  mode: mode,
  devtool: "source-map",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["transform-object-rest-spread"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")({})];
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [...optimizePlugins],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "initial",
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": env
    }),
    new MiniCssExtractPlugin({}),
    new webpack.WatchIgnorePlugin(["node_modules/**/*"])
  ]
};
