import React from 'react'

/**
 * Parent Component
 */
class Parent extends React.Component {
  /**
   * Called when there are incoming props
   */
  // componentWillReceiveProps(nextProps) {
  //     // Pass the props coming from the page to my state
  //     this.setState(nextProps)
  // }

  render() {
    const propsMap = Object.keys(this.props).map(key =>
        (
          <div key={key}>
          <span className='propLabel'>{key}</span>
          <span className='propValue'>{JSON.stringify(this.props[key])}</span>
          </div>
        )
    )
    const propsTable = <div className='propTable'>{propsMap}</div>
    return (
      <div className='parentComponent'>
      <h3>This is the second component.</h3>
      <h4>I'm currently displaying my parents' props and passing them down to my child</h4>
      {propsTable}
      <Child {...this.props}/>
      </div>
    )
  }
}

/**
 * Child Component
 */
class Child extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = props
  }

  handleChange(type, event) {
    try {
      const value = event.target.value
      let state
      if (type === 'object') {
        state = {
          objectProp: JSON.parse(event.target.value),
        }
      } else if (type === 'string') {
        state = {
          stringProp: value,
        }
      } else if (type === 'number') {
        state = {
          numberProp: +value,
        }
      }
      this.setState(state)
    } catch (error) {
      // invalid json
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    const stateMap = Object.keys(this.state).map(key =>
        (
          <div key={key}>
          <span className='propLabel'>{key}</span>
          <span className='propValue'>{JSON.stringify(this.state[key])}</span>
          </div>
        )
    )
    const stateTable = <div className='stateTable'>{stateMap}</div>
    return (
      <div className='childComponent'>
      <h3>I'm the last component</h3>
      <h4>I will transfer my parent's props to my state and then display that instead. I can mutate my state which will change my display but also still receive changes from my parent.</h4>
      <div>
      <EnterProps {...this.state} handleChange={this.handleChange}/>
      {stateTable}
      </div>
      </div>
    )
  }
}

/**
 * Classed used to enter sample props
 */
class EnterProps extends React.Component {
  render() {
    return (<div className='propsVsStateBox'>
      <div className='propInputBox'>
      <label htmlFor='stringProp'>String Prop</label>
      <input id='stringProp' type='text' onChange={this.props.handleChange.bind(this, 'string')} value={this.props.stringProp}/>
      </div>
      <div className='propInputBox'>
      <label htmlFor='stringprop'>Number Prop</label>
      <input id='numberProp' type='text' onChange={this.props.handleChange.bind(this, 'number')} value={this.props.numberProp}/>
      </div>
      <div className='propInputBox'>
      <label htmlFor='objectProp'>Object Prop</label>
      <input id='objectProp' type='text' onChange={this.props.handleChange.bind(this, 'object')} defaultValue={JSON.stringify(this.props.objectProp)}/>
      </div>
      </div>)
  }
}

/**
 * PropsVsState component that will render everything
 */
class PropsVsState extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
    this.state = {
      stringProp: 'This is sample text',
      numberProp: 3,
      objectProp: { useReact: true },
    }
  }

  handleChange(type, event) {
    try {
      const value = event.target.value
      let state
      if (type === 'object') {
        state = {
          objectProp: JSON.parse(event.target.value),
        }
      } else if (type === 'string') {
        state = {
          stringProp: value,
        }
      } else if (type === 'number') {
        state = {
          numberProp: +value,
        }
      }
      this.setState(state)
    } catch (error) {
      // invalid json
    }
  }

  render() {
    return (
      <div className='PropsVsState'>
        <h2>Props vs State</h2>
        <div><span>This page explores two React concepts: component props and component state.</span><a href='https://github.com/uberVU/react-guide/blob/master/props-vs-state.md'>This page</a> does a good job at explaining the difference between the two.</div>
        <div>
          <h3>I'm the first component in the hierarchy.</h3>
          <h4>Changing these values will propagate them to child components</h4>
          <EnterProps {...this.state} handleChange={this.handleChange}/>
          <Parent stringProp={this.state.stringProp} numberProp={this.state.numberProp} objectProp={this.state.objectProp}/>
        </div>
      </div>
    )
  }
}

export default PropsVsState
