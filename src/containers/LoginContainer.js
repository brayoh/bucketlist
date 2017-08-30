// @flow

import React, { Component } from 'react';
import {connect} from "react-redux";
import { browserHistory } from "react-router";
import LoginForm from '../components/login';
import {login} from "../actions/authorization";

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

  componentWillReceiveProps(nextProps){
    console.log("nextProps", nextProps)
    if(nextProps.response.authenticated === true){
      // user is authenticated redirect to dashboard
      browserHistory.push("/dashboard");
    }
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
          {this.props.response.message}
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state: Object, ownProps: Object) => {
  return {
    response: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
    loginUser: payload => dispatch(login(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
