import React from 'react'
import AppBar from 'material-ui/AppBar'

// Create the Home component by extending React.Component
// export default class Home extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }

//     render() {
//         return (
//             <div className='home'>
//                 <h2>Home</h2>
//                 <span>This is the simple home page</span>
//             </div>
//         )
//     }
// }

/**
 * Setting the Home component as a stateless function.
 * See https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
 */
export default () =>
  <div className='home'>
    <AppBar title='Home'/>
    <h2>Home</h2>
    <span>This is the simple home page</span>
  </div>
