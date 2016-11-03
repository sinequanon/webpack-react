import path from 'path'
import webpack from 'webpack'
// Used to output css file in PROD build
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// Plugin for using cssnext features
import postcssnext from 'postcss-cssnext'
// Use precss as replacement for sass lib due to apparent speed up and much 
// faster compilation using postcss
import precss from 'precss'
// Include postcss-import to fix a hot loading bug in imported css files
import postcssImport from 'postcss-import'
// Reporter for postcss process
import postcssReporter from 'postcss-reporter'
// Import plugins necessary for configuration
import plugins from './plugins'

const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  entry : { 
    // The main JS file for the app
    app : [
      'react-hot-loader/patch',
      path.resolve(__dirname, '..', 'src', 'client.js'),
      // Styles are referenced in 'client.js' via an import statement in
      // order for webpack to process it. However it can also be included
      // as an entry as seen below. However this will emit a JS output file
      // with the same name as the stylesheet that will have an empty eval
      // statement. The import statement method in 'client.js' is
      // preferred.
      //style : path.resolve(__dirname, 'src', 'styles', 'app.scss')
    ],
    common : [ path.resolve(__dirname, '..', 'src', 'common.js') ]
  },
    output : {
      // File system path where output files are emitted
      path          : path.resolve(__dirname, '..', 'dist'),
        // Name of the emitted file. [name] here means it will take on the
        // same name as the source. Otherwise it can be hardcoded.
        filename      : '[name].js',
        chunkFileName : '[id].js',
        // The logical path in the browser
        publicPath    : '/'
    },
    // See https://webpack.github.io/docs/configuration.html#devtool for
    // different options
    devtool : IS_PROD ? 'cheap-module-source-map' : 'source-map',
    resolve : {
      // The location of our node_modules
      root : [
        path.resolve(__dirname, 'node_modules')
      ]
    },
    target : 'web',
    module : {
      preLoaders : [
        // Run js code through eslint. This also could have been written
        // as an additional loader in the loaders section for js* files
        // eg 'babel?presets[]...!eslint'
        {
          test    : /\.jsx?$/,
            exclude : /node_modules/,
            loader  : 'eslint',
        }
      ],
        loaders : [
          // Loaders in webpack are read from right to left
          // Transpiles our JS files
          {
            test    : /\.jsx?$/,
              exclude : /node_modules/,
              // Disable react hot module loading in PROD
              loader  : IS_PROD ? 
              'babel?presets[]=react' :
              'babel?presets[]=react&plugins[]=transform-object-rest-spread&plugins[]=transform-runtime&plugins[]=react-hot-loader/babel'
              /*
                     Could also be written :
                     loaders : ['babel-loader', 'eslint-loader'],
                     query : {
                         presets : [ 'es2015', 'stage-0', 'react', 'react-hmre' ],
                         plugins : [ 'transform-runtime' ]
                     }
                     */
          },
          // Convert from sass -> postcss -> css -> style
          {
            test   : /\.s?css$/,
              loader : IS_PROD ?
              // Use plugin to emit file that is processed and
              // minimized
              ExtractTextPlugin.extract('style', 'css?sourceMap&minimize!postcss?sourceMap') :
              'style!css?sourceMap!postcss?sourceMap'
            // Could also be written :
            // loaders : [ 'style', 'css?sourceMap', 'postcss', 'sass?sourceMap' ]
          },
          {
            // Image assets
            test   : [/\.png/, /\.jpg$/, /\.gif$/],
            // Any image assets will be autoconverted to inline base64
            // unless they are over the limit specified in the query
            // parameter. If the assets is over the limit, the
            // file-loader takes over and will emit the file using the
            // naming pattern specified. name options include [path]
            // [name] [hash] [ext] In the case below, we are telling
            // the loader to emit the file in the static directory
            // using the file name followed by the hash and extension.
            loader : 'url?limit=1&name=static/[name]-[hash].[ext]'
          }
        ]
    },
    plugins : plugins,
    // Post css function for additional css compilation
    postcss : function(webpack) {
      return [ 
        // Fixes a bug where file @imports are not recompiled during hot
        // loading. Remove once precss fixes this.
        // This must be first in order for @imports to hot load during
        // development.
        postcssImport({ addDependencyTo: webpack }), 
        // Allow sass syntax in css
        precss,
        // Allow next gen css syntax
        postcssnext(),
        // postcss logging
        postcssReporter({ clearMessages : true }),
      ]
    }
}
