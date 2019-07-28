const webpack = require('webpack')

module.exports = {
  mode:"production",

  entry:{
    app: './src/App.jsx',
    vendor: ['react','react-dom','whatwg-fetch'],
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin(
      {
        name:'vendor',
        filename:'vendor.bundle.js' 
      })
  ],
  output: {
    path: __dirname + "/dist/js",
    filename: 'app.bundle.js'
  },
  
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use:{
          loader: 'babel-loader',
          query: {
            presets: ['react','es2015']
          }
        }
    },
   ]
  }
}