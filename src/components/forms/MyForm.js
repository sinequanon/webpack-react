import React from 'react'
import { Field, reduxForm } from 'redux-form'

const MyForm = () =>
  <div>
    <form>
      <Field name='firstName' component='input' type='text' label='First Name'/>
    </form>
  </div>

export default reduxForm({
  form: 'MyForm'
})(MyForm)

