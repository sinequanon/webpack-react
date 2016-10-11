import Home from './Home'
import ReactState from './ReactState'
import PropsVsState from './PropsVsState'
import RouteParams from './RouteParams'
import Forms from './forms/Forms'

export default [
  { pattern: '/', exact: true, component: Home },
  { pattern: '/reactState', component: ReactState },
  { pattern: '/propsVsState', component: PropsVsState },
  { pattern: '/routeParams/:first/:second', component: RouteParams },
  { pattern: '/forms', component: Forms }
]
