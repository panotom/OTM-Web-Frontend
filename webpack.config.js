const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = (env, argv) => {
  
  // set all the environment we need
  const isEnvDevelopment = argv.mode === 'development';
  const isEnvProduction = argv.mode === 'production';
  
  // our environment
  EnvBrowserPath = isEnvDevelopment ? 'http://localhost:9000/' : 'https://www.mountainpanoramas.com/____otm-test/';

  return {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        // styles
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        // js
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        // images
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
    
    // Clean dist folder
    new CleanWebpackPlugin(),


    // HTML template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.ejs"),
      filename: isEnvDevelopment ? 'index.html' : 'index.php'
    }),
    
    // copy language jsons
    new CopyPlugin({
      patterns: [
        { from: "localization", to: "l" }
      ],
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
    
    // inject the OTM environment
    new webpack.DefinePlugin({
      OTM_ENV_BROWSERPATH: JSON.stringify(EnvBrowserPath)
    }),

  ]
  };
};
