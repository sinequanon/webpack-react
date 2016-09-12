import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import Section1 from './Section1';
import Section2 from './Section2';

module.exports = (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/section1' component={Section1}/>
        <Route path='/section2' component={Section2}/>
    </Route>
);
