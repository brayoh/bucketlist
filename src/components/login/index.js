import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from "material-ui/Paper";
// import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

// @flow weak
const LoginForm = (props: Object) : HTMLElement => (
  <Grid>
    <Paper>
      <form onSubmit={(event) => { props.handleSubmit(event) }}>
        <input type="text" onChange={props.handleChange} name="username" />
        <input type="password" onChange={props.handleChange} name="password" />
        <TextField
          label="username"
          name="username" />
        <button type="submit"> Submit</button>
      </form>
    </Paper>
  </Grid>
);

export default LoginForm;
