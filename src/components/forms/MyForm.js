import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

const MyForm = () =>
  <div>
    <form>
      <Field name='firstName' component={TextField} type='text' floatingLabelText='First Name'/>
      <br/>
      <Field name='lastName' component={TextField} type='text' floatingLabelText='Last Name'/>
    </form>
  </div>

export default reduxForm({
  form: 'MyForm'
})(MyForm)

