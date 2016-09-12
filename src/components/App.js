import React from 'react';
import NavLink from './NavLink';

export default React.createClass({
    render() {
        return (
        <div className='app'>
            <h1>App</h1>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/section1'>Section 1</NavLink></li>
                <li><NavLink to='/section2'>Section 2</NavLink></li>
            </ul>
            { this.props.children }
        </div>
        );
    },
});

