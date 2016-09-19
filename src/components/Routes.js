import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import ReactState from './ReactState';
import PropsVsState from './PropsVsState';
import RouteParams from './RouteParams';

// Alternate route config instead of declarative
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
// const routeConfig = {
//     path: '/',
//     component: App,
//     indexRoute: { component: Home },
//     childRoutes: [
//         { path: '/reactState', component: ReactState },
//         { path: '/propsVsState', component: PropsVsState },
//         { path: '/routeParams/:first/:second', component: RouteParams },
//     ]
// };
// export default routeConfig;
export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/reactState' component={ReactState}/>
        <Route path='/propsVsState' component={PropsVsState}/>
        <Route path='/routeParams/:first/:second' component={RouteParams}/>
    </Route>
);
