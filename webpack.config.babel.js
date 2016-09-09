import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const IS_PROD = process.env.NODE_ENV === 'production';

console.log('ISPROD', IS_PROD);
// Base plugins we want to include in the config
let plugins = IS_PROD ? [
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin(),
                    // Emits css file using naming pattern below
                    new ExtractTextPlugin('[name]-[contenthash].css'),
                    // Prevents emitting assets that include errors in them
                    // Do not include in non PROD environments otherwise lint 
                    // warnings will fail to emit anything to the build
                    new webpack.NoErrorsPlugin()
               ] : 
               [];

export default {
     entry : { 
          app : path.resolve(__dirname, 'src', 'client.js'),
          style : path.resolve(__dirname, 'src', 'styles', 'app.scss')
     },
     output : {
          path          : path.resolve(__dirname, 'dist'),
          filename      : '[name].js',
          chunkFileName : '[id].js',
          publicPath    : '/'
     },
     devtool : 'cheap-eval-source-map',
     resolve : {
          root : [
               path.resolve(__dirname, 'node_modules')
          ]
     },
     target : 'web',
     module : {
          preLoaders : [
               {
                    test    : /\.jsx?$/,
                    exclude : /node_modules/,
                    loader  : 'eslint',
               }
          ],
          loaders : [
               // Loaders in webpack are read from right to left
               {
                    test    : /\.jsx?$/,
                    exclude : /node_modules/,
                    loader  : 'babel?presets[]=es2015&presets[]=react&plugins[]=transform-runtime'
                    /*
                     Could also be written :
                     loaders : ['babel-loader', 'eslint-loader'],
                     query : {
                         presets : [ 'es2015', 'react' ],
                         plugins : [ 'transform-runtime' ]
                     }
                     */
               },
               {
                    test   : /\.scss$/,
                    // Convert from sass -> postcss -> css -> style
                    loader : IS_PROD ?
                              ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap') :
                              'style!css?sourceMap!postcss!sass?sourceMap'
                    // Could also be written :
                    // loaders : [ 'style', 'css?sourceMap', 'postcss', 'sass?sourceMap' ]
               },
               {
                    test   : [/\.png/, /\.jpg$/, /\.gif$/],
                    // Any image assets will be autoconverted to inline base64 
                    // unless they are over the limit specified in the query parameter.
                    // name options include [path] [name] [hash] [ext]
                    loader : 'url?limit=1&name=static/[name]-[hash].[ext]'
               }
          ]
     },
     plugins : plugins.concat([
          // Moves any common code that webpack finds into a unified file
          new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
          // Creates index.html file using app.html as base template. index.html will 
          // include any css or javascript references automatically
          new HtmlWebpackPlugin({ 
               // Output defaults to 'index.html'
               // Inject assets at the bottom of the body tag. Value can also be 'body'
               inject   : true,
               // emit the file only if it was changed
               cache    : true,
               // Source template to use for the emitted asset
               template : 'src/app.html',
          }),
     ])
};
