import React, { Component } from "react";
import {connect} from "react-redux";
import AppNavigation from "./navigation/";

class App extends Component{
  render(){
    return(
      <div>
        <AppNavigation
          authenticated={this.props.auth}
          username={this.props.whoami.username}
          route={this.props.currentRoute} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  auth: state.auth.authenticated,
  whoami: state.whoami,
  currentRoute: ownProps.location.pathname
});

export default connect(mapStateToProps, null)(App);
