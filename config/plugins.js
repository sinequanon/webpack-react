/**
 * Webpack plugins
 */

import webpack from 'webpack';
// Emits html files injected with asset tags
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Used to output css file in PROD build
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// Fixes possible dupes in ExtractTextPlugin 
import optimizeCssAssets from 'optimize-css-assets-webpack-plugin';
// Hook into notification systems so we don't have to constantly monitor the 
// terminal
import webpackNotifierPlugin from 'webpack-notifier';
// Linting for styles
import stylelintPlugin from 'stylelint-webpack-plugin';

const IS_PROD = process.env.NODE_ENV === 'production';

// Base plugins we want to include in the config
let plugins = [
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new optimizeCssAssets(),
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
                    new stylelintPlugin({}),
                    new webpackNotifierPlugin()
               ];

if (IS_PROD) {
     plugins = plugins.concat([
          new webpack.optimize.UglifyJsPlugin({
               comments : false,
               compress : {
                    screw_ie8 : true,
                    warnings : true,
               }
          }),
          // Emits css file using naming pattern below
          new ExtractTextPlugin('[name]-[contenthash].css'),
          // Prevents emitting assets that include errors in them
          // Do not include in non PROD environments otherwise lint 
          // warnings will fail to emit anything to the build
          new webpack.NoErrorsPlugin(),
     ]);
}
export default plugins;
