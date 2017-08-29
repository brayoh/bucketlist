// @flow

import React, { Component } from 'react';
import {connect} from "react-redux";
import LoginForm from '../../components/forms/LoginForm';
import {login} from "../../actions/login";

class LoginContainer extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e: Object) {
    e.preventDefault();
    // send data to API
    this.props.loginUser(this.state)
  }
  handleChange(e: Object) {
    let input = {}
    input[e.target.name] = e.target.value;
    this.setState(input);
  }
  render() {
    return (
      <div className="login-containter">
        <LoginForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state: Object) => {
  console.log("this is the state", state)
  return {
    message: state.default.message
  }
}

const mapDispatchToProps = dispatch => ({
    loginUser: payload => dispatch(login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
