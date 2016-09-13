import React from 'react';
import { Link, IndexLink } from 'react-router';


export default React.createClass({
    render() {
        const isIndex = this.props.to === '/';
        return (
            isIndex ?
            <IndexLink {...this.props} activeClassName='active'/> :
            <Link {...this.props} activeClassName='active'/>
        );
    },
});
