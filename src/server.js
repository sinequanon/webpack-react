import React from 'react'
import restify from 'restify'
import path from 'path'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import compression from 'compression'

// Import our react component that contains the react router
import Root from './components/Root'

const debug = require('debug')('server') /* eslint import/no-extraneous-dependencies : 0 */

const PORT = process.env.PORT || 8080

const app = restify.createServer()

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
  debug('Running PRODUCTION')
}

const renderPage = (baseHtml, content) =>
  baseHtml.replace('<div class="appMountPoint"></div>', `<div class="appMountPoint">${content}</div>`)

let baseHtml

// Target the compiled output directory
const distDirectory = path.resolve(__dirname, '..', 'dist')

// Tell restify where to load static assets
app.get(/.*(png|jpg|gif)/, restify.serveStatic({ directory: distDirectory }))
app.get(/.*(js|css)/, restify.serveStatic({ directory: distDirectory }))

app.get(/\//, (req, res) => {
  const context = createServerRenderContext()

  let markup = renderToString(
    <ServerRouter
      location={req.url}
      context={context}>
      <Root/>
    </ServerRouter>
  )

  const result = context.getResult()

  if (result.redirect) {
    res.redirect(301, result.redirect.pathname)
  } else {
    if (result.missed) {
      res.status(404)
      markup = renderToString(
        <ServerRouter
          location={req.url}
          context={context}>
          <Root/>
        </ServerRouter>
      )
      res.end(markup)
    }

    let fullMarkup
    if (!baseHtml) {
      debug('Loading file...')
      // This only works correctly if we have a single entry point
      // Multiple entry points would require us to find and load
      // the correct entry point file instead of just index.html
      fs.readFile(path.resolve(__dirname, '..', 'tmp', 'index.html'), (err, data) => {
        if (err) {
          throw err
        }
        baseHtml = data.toString()
        fullMarkup = renderPage(baseHtml, markup)
        res.status(200)
        res.end(fullMarkup)
      })
    } else {
      debug('No file load')
      fullMarkup = renderPage(baseHtml, markup)
      res.status(200)
      res.end(fullMarkup)
    }
  }
})

app.listen(PORT, () => {
  debug('Restify listening on port %s', PORT)
})
