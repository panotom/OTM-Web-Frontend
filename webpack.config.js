const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'i',
            esModule: false
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    
    // provide leaflet globally
    new webpack.ProvidePlugin({
      L: 'leaflet',
      'window.L': 'leaflet'
    }),
      
    // provide toGeoJSON globally
    new webpack.ProvidePlugin({
      toGeoJSON: '@mapbox/togeojson',
      'window.toGeoJSON': '@mapbox/togeojson'
    }),
      
  ]
};
