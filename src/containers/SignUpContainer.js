// @flow
import React, { Component } from 'react';
import {connect} from "react-redux";
import { browserHistory } from "react-router";
import Snackbar from "material-ui/Snackbar";
import {signup} from "../actions/authorization";
import SignUpForm from '../components/signup';

class SignUpContainer extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      password: '',
      open: false,
      vertical: 'top',
      horizontal: 'center'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps", nextProps)
    if(nextProps.response.status === "success"){
      // user registration was successful

    }
    // display the error
    this.setState({
      open: true
    })
  }

  handleSubmit(e: Object) {
    e.preventDefault();
    // send data to API
    this.props.registerUser(this.state);
  }

  handleChange(e: Object) {
    let input = {}
    input[e.target.name] = e.target.value;
    this.setState(input);
  }

  handleRequestClose(){
     this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div className="login-container">
        <SignUpForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <Snackbar
           anchorOrigin={{ vertical, horizontal }}
           open={open}
           onRequestClose={this.handleRequestClose}
           SnackbarContentProps={{
             'aria-describedby': 'message-id',
           }}
           message={this.props.response.message}
         />
      </div>
    );
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  response: state.auth
})

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
