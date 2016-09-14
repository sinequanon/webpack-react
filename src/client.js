import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// Import a react component
import routes from './components/Routes';
// import Layout from './components/layout';

// By referencing our stylesheet entry point, this forces webpack to run it through
// its loader system and makes it available as output.
// Another way to include a style sheet is to add it as an entry in the
// webpack.config.js file. However this will create an unecessary output file that
// will be named the same as the stylesheet.
import './styles/app.scss';

render(<Router routes={routes} history={browserHistory}/>,
//render(<Layout/>,
document.querySelector('.appMountPoint'));
