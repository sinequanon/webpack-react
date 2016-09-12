import React from 'react';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import compression from 'compression';
import routes from './components/Routes';

const PORT = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV === 'production') {
     app.use(compression());
}
// Tell express where to load static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

let baseHtml;
app.get('*', (req, res) => {
     match({ routes : routes, location : req.url }, ( error, redirectLocation, renderProps ) => {
          if (error) {
               console.log('Error', error);
          } else if (redirectLocation) {
               res.redirect(redirectLocation.pathname + redirectLocation.search)
          } else if (renderProps) {
               if (!baseHtml) {
                    console.log('file load');
                    fs.readFile(path.resolve(__dirname, '..', 'tmp', 'index.html'), (err, data) => {
                         if (err) {
                              throw err;
                         }
                         baseHtml = data.toString();
                         res.send(renderPage(baseHtml, renderProps));
                    } );
               } else {
                    console.log('no file load');
                    res.send(renderPage(baseHtml, renderProps));
               }
          } else {
               res.status(404).send('Nada');
          }
     });
});

function renderPage(baseHtml, renderProps) {
     const content = renderToString(<RouterContext {...renderProps}/>);
     return baseHtml.replace('<div class="appMountPoint"></div>', content);
}

app.listen(PORT, () => {
     console.log('Express listening on port ' + PORT);
})
