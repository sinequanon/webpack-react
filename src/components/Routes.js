import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import ReactState from './ReactState';
import PropsVsState from './PropsVsState';
import RouteParams from './RouteParams';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/reactState' component={ReactState}/>
        <Route path='/propsVsState' component={PropsVsState}/>
        <Route path='/routeParams/:first/:second' component={RouteParams}/>
    </Route>
);
