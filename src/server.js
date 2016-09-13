import React from 'react';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import compression from 'compression';
import routes from './components/Routes';
const debug = require('debug')('server');

const PORT = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV === 'production') {
     app.use(compression());
     debug('Running PRODUCTION');
}
// Tell express where to load static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

let baseHtml;
app.get('*', (req, res) => {
     match({ routes : routes, location : req.url }, ( error, redirectLocation, renderProps ) => {
          if (error) {
               debug('Error', error);
               res.status(500).send(error.message);
          } else if (redirectLocation) {
               res.redirect(302, redirectLocation.pathname + redirectLocation.search)
          } else if (renderProps) {
               if (!baseHtml) {
                    debug('Loading file...');
                    // This only works correctly if we have a single entry point
                    // Multiple entry points would require us to find and load
                    // the correct entry point file instead of just index.html
                    fs.readFile(path.resolve(__dirname, '..', 'tmp', 'index.html'), (err, data) => {
                         if (err) {
                              throw err;
                         }
                         baseHtml = data.toString();
                         res.status(200).send(renderPage(baseHtml, renderProps));
                    } );
               } else {
                    debug('No file load');
                    res.status(200).send(renderPage(baseHtml, renderProps));
               }
          } else {
               res.status(404).send('Nada');
          }
     });
});

function renderPage(baseHtml, renderProps) {
     const content = renderToString(<RouterContext {...renderProps}/>);
     return baseHtml.replace('<div class="appMountPoint"></div>', '<div class="appMountPoint">' + content + '</div>');
}

app.listen(PORT, () => {
     debug('Express listening on port %s', PORT);
})
