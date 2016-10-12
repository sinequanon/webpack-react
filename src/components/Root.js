/**
 * Alternate file where we define the Router in a separate component
 */
import React from 'react'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import ReactState from './ReactState'
import PropsVsState from './PropsVsState'
import RouteParams from './RouteParams'
import Home from './Home'
import routeMap from './Routes'
import configureStore from '../redux/configureStore'
import Forms from './forms/Forms'

const useConfig = false
let appComponent
// Example using declarative Match vs a route config
if (useConfig) {
  appComponent = <MuiThemeProvider>
      <App>
        { routeMap.map((route, i) =>
          (route.exact && <Match key={i} exactly pattern={route.pattern} component={route.component}/>) ||
          <Match key={i} pattern={route.pattern} component={route.component}/>
        )}
      </App>
    </MuiThemeProvider>
} else {
  appComponent = <MuiThemeProvider>
      <App>
        <Match exactly pattern='/' component={Home} />
        <Match pattern='/reactState' component={ReactState} />
        <Match pattern='/propsVsState' component={PropsVsState} />
        <Match pattern='/routeParams/:first/:second' component={RouteParams} />
        <Match pattern='/forms' component={Forms} />
      </App>
    </MuiThemeProvider>
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

export default () =>
  <BrowserRouter>
    <Provider store={configureStore()}>
      {appComponent}
    </Provider>
  </BrowserRouter>
