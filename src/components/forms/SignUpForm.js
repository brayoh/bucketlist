// @flow
import React from 'react';

const SignUpForm = (props: Object) : HTMLDivElement => (
  <div>
    <form onSubmit={(event: Object) => props.handleSubmit(event) }>
      <input type="text" onChange={props.handleChange} name="username" />
      <input type="password" onChange={props.handleChange} name="password" />
      <button type="submit"> Submit</button>
    </form>
  </div>
);

export default SignUpForm;
