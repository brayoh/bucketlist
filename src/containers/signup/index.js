// @flow
import React, { Component } from 'react';
import SignUpForm from '../../components/forms/SignUpForm';


class SignUpContainer extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e: Object) {
    e.preventDefault();
    // send data to API
  }
  handleChange(e: Object) {
    // console.log(e.target.name, e.target.value);
    this.setState({
      name: e.target.value,
    });
  }
  render() {
    return (
      <div className="login-containter">
        <SignUpForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default SignUpContainer;
