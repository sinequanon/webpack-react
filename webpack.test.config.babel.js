import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {

  entry: 'mocha!./test/index.js',

  output: {
    filename: path.resolve(__dirname, 'tmp', 'test.bundle.js')
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },
  plugins: [ 
    new HtmlWebpackPlugin({ 
      // emit the file only if it was changed
      cache    : true,
      // Source template to use for the emitted asset
      template : 'src/app.html',
    }),
  ]
}
