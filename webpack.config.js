const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    sentryWebpackPlugin({
      org: "fengguangpei",
      project: "javascript-react",

      // Auth tokens can be obtained by creating an internal integration
      // at https://<organization_id>.sentry.io/settings/developer-settings/
      // and need "Release: Admin" and "Organization: Read & Write" permissions
      authToken: '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',

      // Enable automatically creating releases and associating commits
      release: {
        create: true,
        setCommits: {
          auto: true,
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            // maxSize: 10000,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
