import React, { Component } from "react";
import AppNavigation from "./navigation/";

class App extends Component{
  render(){
    return(
      <div>
        <AppNavigation />
        {this.props.children}
      </div>
    )
  }
}

export default App;
