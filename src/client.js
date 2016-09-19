/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // Support hot loading

// Import our react component that contains the react router
import Root from './components/Root';
// import Layout from './components/layout';
import filterReactRouterHMRWarnings from './utils/filterReactRouterHMRWarnings';

// By referencing our stylesheet entry point, this forces webpack to run it through
// its loader system and makes it available as output.
// Another way to include a style sheet is to add it as an entry in the
// webpack.config.js file. However this will create an unecessary output file that
// will be named the same as the stylesheet.
import './styles/app.scss';

const IS_PROD = process.env.NODE_ENV === 'production';
const rootComponent = IS_PROD ?
                    <Root/> :
                    <AppContainer><Root/></AppContainer>;

render(rootComponent,
        // render(<Layout/>,
        document.querySelector('.appMountPoint'));

if (module.hot) { // This only runs in DEV
    module.hot.accept('./components/Root', () => {
        // Reload and rename the root module. You cannot reuse the Root
        // variable. The inexplicable will happen if you do.
        const HotRoot = require('./components/Root').default;   // eslint-disable-line
        // Filter any react-router hot loader warnings
        filterReactRouterHMRWarnings();
        render(<AppContainer><HotRoot/></AppContainer>,
            document.querySelector('.appMountPoint'));
    });
}
