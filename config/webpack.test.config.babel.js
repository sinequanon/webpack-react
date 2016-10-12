import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {

  entry: 'mocha!./test/index.js',

  output : {
    filename : path.resolve(__dirname, 'tmp', 'test.bundle.js')
  },

  module : {
    loaders : [
      { test : /\.js$/, exclude : /node_modules/, loader : 'babel-loader?presets[]=react' }
    ]
  },
  devtool : 'source-map',
  // Declare external libraries that are referenced in code. Similar to
  // ember's vendor feature
  externals : {
       // These three are used for enzyme testing
       'cheerio' : 'window',
       'react/addons' : true,
       'react/lib/ReactContext' : true,
       'react/lib/ExecutionEnvironment' : true
  },
  plugins : [ 
    new HtmlWebpackPlugin({ 
      // emit the file only if it was changed
      cache    : true,
      // Source template to use for the emitted asset
      template : 'src/app.html',
    }),
  ]
}
