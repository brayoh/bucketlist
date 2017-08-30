import React, { Component } from "react";
import {connect} from "react-redux";
import AppNavigation from "./navigation/";

class App extends Component{
  render(){
    return(
      <div>
        <AppNavigation authenticated={this.props.auth} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  auth: state.auth.authenticated
});

export default connect(mapStateToProps, null)(App);
