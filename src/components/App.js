import React from 'react';
import NavLink from './NavLink';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
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
//         );
//     }
// }
// export default App;

export default props => (
  <div className='app'>
    <h1>Hot New Prototype</h1>
    <h2>An example Webapp using Webpack, React and React-Router</h2>

    <h3>Clicking these links will use React-Router to render the section below</h3>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/reactState'>Using React state</NavLink></li>
      <li><NavLink to='/propsVsState'>Props and State</NavLink></li>
      <li><NavLink to='/routeParams/react/rules'>Routes params</NavLink></li>
    </ul>
    { props.children }
  </div>
);
