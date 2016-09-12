import React from 'react';
import { Link, IndexLink } from 'react-router';


export default React.createClass({
    render() {
        const isIndex = this.props.to === '/';
        return (
            isIndex ? 
            {/* Use IndexLink if going to '/' otherwise home will always be active
            since all urls begin with '/' */}
            <IndexLink {...this.props} activeClassName='active'/> :
            <Link {...this.props} activeClassName='active'/>
        );
    },
});
