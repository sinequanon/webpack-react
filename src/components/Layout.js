import React from 'react';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>React</h1>
                <h2>Test</h2>
                <h3>Page</h3>
            </div>
        );
    }

}
/* 
// Older way to write react components
export default React.createClass({
    render() {
        return (
            <div>
                <h1>React</h1>
                <h2>Test</h2>
                <h3>Page</h3>
            </div>
        );
    },
}); 
 */
export default Layout;
