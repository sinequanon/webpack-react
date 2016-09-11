import React from 'react';
import ReactDOM from 'react-dom';

// Import a react component
import Layout from './components/layout.jsx';

// By referencing our stylesheet entry point, this forces webpack to run it through
// its loader system and makes it available as output.
// Another way to include a style sheet is to add it as an entry in the
// webpack.config.js file. However this will create an unecessary output file that
// will be named the same as the stylesheet.
import './styles/app.scss';

ReactDOM.render(<Layout/>,
document.querySelector('.appMountPoint'));
