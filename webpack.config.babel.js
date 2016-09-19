import path from 'path';
import webpack from 'webpack';
// Emits html files injected with asset tags
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Used to output css file in PROD build
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// Plugin for using cssnext features
import postcssnext from 'postcss-cssnext';
// Use precss as replacement for sass lib due to apparent speed up and much 
// faster compilation using postcss
import precss from 'precss';
// Include postcss-import to fix a hot loading bug in imported css files
import postcssImport from 'postcss-import';
// Linting for styles
import stylelintPlugin from 'stylelint-webpack-plugin';
// Reporter for postcss process
import postcssReporter from 'postcss-reporter';
// Fixes possible dupes in ExtractTextPlugin 
import optimizeCssAssets from 'optimize-css-assets-webpack-plugin';

const IS_PROD = process.env.NODE_ENV === 'production';

// Base plugins we want to include in the config
let plugins = IS_PROD ? [
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                         comments: false
                    }),
                    // Emits css file using naming pattern below
                    new ExtractTextPlugin('[name]-[contenthash].css'),
                    new optimizeCssAssets(),
                    // Prevents emitting assets that include errors in them
                    // Do not include in non PROD environments otherwise lint 
                    // warnings will fail to emit anything to the build
                    new webpack.NoErrorsPlugin()
               ] : 
               [];

export default {
     entry : { 
          // The main JS file for the app
          app : [
               'react-hot-loader/patch',
               path.resolve(__dirname, 'src', 'client.js'),
               // Styles are referenced in 'client.js' via an import statement in
               // order for webpack to process it. However it can also be included
               // as an entry as seen below. However this will emit a JS output file
               // with the same name as the stylesheet that will have an empty eval
               // statement. The import statement method in 'client.js' is
               // preferred.
               //style : path.resolve(__dirname, 'src', 'styles', 'app.scss')
          ]
     },
     output : {
          // File system path where output files are emitted
          path          : path.resolve(__dirname, 'dist'),
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
                              'babel?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=transform-runtime' :
                              'babel?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=transform-runtime&plugins[]=react-hot-loader/babel'
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
     plugins : plugins.concat([
          // Defines environment variable that will be trigger a pared down
          // version of React to be exercised during minification. NOTE: we
          // already specify the NODE_ENV=production in the package.json
          // script; However that doesn't appear to trigger the minifier to
          // compress the production version which doesn't include debugging
          // info, so we must explicitly set the environment variable with the
          // plugin.
          new webpack.DefinePlugin({
               'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV)
          }),
          // Moves any common code that webpack finds into a unified file
          new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
          // Creates index.html file using app.html as base template.
          // index.html will include any css or javascript references
          // automatically
          new HtmlWebpackPlugin({ 
               // In prod we want to serve the HTML pre-rendered via the server
               // so we want to emit the file outside the final /dist directory
               // otherwise the emitted 'index.html' file will be used instead
               // of the server pre-rendered file from express
               filename : IS_PROD ? '../tmp/index.html' : 'index.html',
               // Inject assets at the bottom of the body tag. Value can also
               // be 'body'
               inject   : true,
               // emit the file only if it was changed
               cache    : true,
               // Source template to use for the emitted asset
               template : 'src/app.html',
          }),
          // Add linting to CSS using stylelint. We are extending
          // stylelint-config-standard
          new stylelintPlugin({})
     ]),
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
          ];
     }
};
