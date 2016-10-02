import React from 'react';
import { Link, IndexLink } from 'react-router';

class NavLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isIndex = this.props.to === '/';
    return (
      isIndex ?
      <IndexLink {...this.props} activeClassName='active'/> :
      <Link {...this.props} activeClassName='active'/>
    );
  }
}

export default NavLink;
