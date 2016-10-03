/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader' // Support hot loading

// Import our react component that contains the react router
import Root from './components/Root'
// import Layout from './components/layout'

// By referencing our stylesheet entry point, this forces webpack to run it through
// its loader system and makes it available as output.
// Another way to include a style sheet is to add it as an entry in the
// webpack.config.js file. However this will create an unecessary output file that
// will be named the same as the stylesheet.
import './styles/app.scss'

const IS_PROD = process.env.NODE_ENV === 'production'
const rootComponent = IS_PROD ?
  <Root/> :
  <AppContainer><Root/></AppContainer>

const DOM_MOUNT_POINT = document.querySelector('.appMountPoint')
render(rootComponent,
  // render(<Layout/>,
  DOM_MOUNT_POINT)

if (module.hot) { // This only runs in DEV
  module.hot.accept('./components/Root', () => {
    // Reload and rename the root module. You cannot reuse the Root
    // variable. The inexplicable will happen if you do.
    const HotRoot = require('./components/Root').default   // eslint-disable-line
    // Prevent the hot reloading error from react-router
    unmountComponentAtNode(DOM_MOUNT_POINT)
    render(<AppContainer><HotRoot/></AppContainer>,
      DOM_MOUNT_POINT)
  })
}
