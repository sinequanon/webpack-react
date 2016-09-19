/**
 * Alternate file where we define the Router in a separate component
 *
 */
import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './Routes';

export default () => (
    <Router routes={routes} history={browserHistory}/>
);
