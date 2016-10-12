import React from 'react'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'

import NavLink from './NavLink'

// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }

//     render() {
//         return (
//         <div className='app'>
//             <h1>Hot New Prototype</h1>
//             <h2>An example Webapp using Webpack, React and React-Router</h2>

//             <h3>Clicking these links will use React-Router to render the section below</h3>
//             <ul>
//                 <li><NavLink to='/'>Home</NavLink></li>
//                 <li><NavLink to='/reactState'>Using React state</NavLink></li>
//                 <li><NavLink to='/propsVsState'>Props and State</NavLink></li>
//                 <li><NavLink to='/routeParams/react/rules'>Routes params</NavLink></li>
//             </ul>
//             { this.props.children }
//         </div>
//         )
//     }
// }
// export default App

const subheaderStyle = {
  fontSize: '18px'
}
export default props => (
  <div className='app'>
      <AppBar title='WebPack React Prototype' iconClassNameRight='muidocs-icon-navigation-expand-more'/>
      <Subheader style={subheaderStyle}>An example Webapp using Webpack, React, Redux and React-Router</Subheader>

      <Subheader style={subheaderStyle}>Clicking these links will use React-Router to render the section below</Subheader>
      <List>
        <ListItem><NavLink to='/'>Home</NavLink></ListItem>
        <ListItem><NavLink to='/reactState'>Using React state</NavLink></ListItem>
        <ListItem><NavLink to='/propsVsState'>Props and State</NavLink></ListItem>
        <ListItem><NavLink to='/routeParams/react/rules'>Route params</NavLink></ListItem>
        <ListItem><NavLink to='/forms'>Forms</NavLink></ListItem>
      </List>
      { props.children }
  </div>
)
