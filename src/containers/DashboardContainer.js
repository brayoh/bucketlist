// @flow
import React, { Component } from 'react';
import {connect} from "react-redux";
import { browserHistory } from "react-router";
import {getBucketlists} from "../actions/bucketlist";
import BucketlistCard from "../components/cards/BucketlistCard";

class DashboardContainer extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    const token: string = localStorage.getItem("awesome_bucketlist_token");
    this.props.getBucketlists(token);
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

  render() {
    return (
      <div>
        <BucketlistCard className="card" buckets={this.props.bucketlists} />
      </div>
    );
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  bucketlists: state.bucketlists,
  whoami: state.whoami
})

const mapDispatchToProps = dispatch => ({
  getBucketlists: token => dispatch(getBucketlists(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
