import React from 'react'
import { connect } from 'react-redux'

import MyForm from './MyForm'

const Forms = ({ dispatch, state }) =>
  <div>
    <h2 onClick={() => { dispatch({ type: 'HEADER_CLICKED' }) }}>Forms Using Redux</h2>
    <MyForm />
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  </div>


const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(Forms)
