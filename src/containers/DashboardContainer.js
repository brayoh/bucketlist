// @flow
import React, {Component} from 'react';
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import Snackbar from 'material-ui/Snackbar';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {getBucketlists, addBucketlist, updateBucketlist, deleteBucketlist, resetRequestState} from "../actions/bucketlist";

import BucketlistCard from "../components/cards/BucketlistCard";
import AddBucketDialog from "../components/modals/CreateModal";
import ConfirmActionDialog from "../components/modals/ConfirmationModal";

class DashboardContainer extends Component {
  constructor(props : Object) {
    super(props);
    this.state = {
      name: '',
      description: '',
      done: false,
      action: "",
      addModalOpen: false,
      confirmModalOpen: false,
      open: false,
      message: '',
      bucket_id: ""
    };
    this.handleAddBucket = this.handleAddBucket.bind(this);
    this.handleEditBucket = this.handleEditBucket.bind(this);
    this.handleDeleteBucket = this.handleDeleteBucket.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    const token : string = localStorage.getItem("awesome_bucketlist_token");
    this.props.getBucketlists(token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bucketlists.request.status === 'success') {
      const {token} = this.props.whoami;
      this.props.getBucketlists(token);

      this.setState({
        addModalOpen: false,
        confirmModalOpen: false,
        open: true,
        name: "",
        description: "",
        message: "",
        open: false,
        vertical: 'top',
        horizontal: 'center'
      });

      this.props.resetRequestState();

    } else if(nextProps.bucketlists.request.status === "failed") {

      this.setState({ message: nextProps.response.message })
    }
  }

  handleAddBucket(e : Object) {
    e.preventDefault();
    const {name, description} = this.state;
    const {token} = this.props.whoami;
    // send data to API
    this.props.addBucket({name, description, token});
  }

  handleEditBucket(e : Object) {
    e.preventDefault();
    const {name, description, done, bucket_id} = this.state;
    const {token} = this.props.whoami;
    // send data to API
    this.props.updateBucket({bucket_id, name, description, done, token});
  }

  handleDeleteBucket(e : Object) {
    e.preventDefault();
    const {token} = this.props.whoami;
    const bucket_id = this.state.bucket_id;

    // send data to API
    this.props.deleteBucket({bucket_id, token});
  }

  handleChange(e : Object) {
    let bucket = {}
    bucket[e.target.name] = e.target.value;
    this.setState(bucket);
  }

  // show add bucketlist modal
  handleRequestOpen(type : string, bucket_id : Number) {
    if (type === "confirm") {
      this.setState({
        confirmModalOpen: true,
        bucket_id: parseInt(bucket_id)
      });
    } else if (type === "edit") {
      // get bucketlist from state
      const bucketlist = this.props.bucketlists.filter((bucket) => bucket.id === parseInt(bucket_id))

      this.setState({
        'bucket_id': bucketlist[0].id,
        'name': bucketlist[0].name,
        'description': bucketlist[0].description,
        'addModalOpen': true, 'action': 'edit'
      })
    } else {
      this.setState({ addModalOpen: true, action: 'add' });
    }
  }

  // hide add bucketlist modal
  handleRequestClose(type : string) {
    if (type === "confirm") {
      this.setState({
        confirmModalOpen: false,
        name: "",
        description: ""});
    } else {
      this.setState({
        addModalOpen: false,
        open: false,
        name: "",
        description: ""
      });
    }
  }

  render() {
    const {vertical, horizontal, open} = this.state;
    return (
      <div>
        <div className="btn-container" style={{
          'position': 'absolute',
          'right': '2%',
          'bottom': '-15%',
          'marginBottom': '2%'
        }}>
          <Button fab color="primary" aria-label="add" onClick={this.handleRequestOpen}>
            <AddIcon />
          </Button>
        </div>
        <div>
          <BucketlistCard
            className="card"
            buckets={this.props.bucketlists}
            handleRequestOpen={this.handleRequestOpen} />
        </div>
        <div>
          <AddBucketDialog
            open={this.state.addModalOpen}
            title="bucketlist"
            name={this.state.name}
            description={this.state.description}
            action={this.state.action}
            handleChange={this.handleChange}
            handleAdd={this.handleAddBucket}
            handleEdit={this.handleEditBucket}
            handleRequestClose={this.handleRequestClose}
            errorText={this.state.message} />
        </div>
        <div>
          <ConfirmActionDialog
            open={this.state.confirmModalOpen}
            action="delete bucketlist"
            handleAction={this.handleDeleteBucket}
            handleRequestClose={this.handleRequestClose} />
        </div>
        <div>
        { this.state.message !== "" &&
          <Snackbar anchorOrigin={{
              vertical,
              horizontal
            }}
            open={open}
            onRequestClose={this.handleRequestClose}
            SnackbarContentProps={{
            'aria-describedby': 'message-id'
            }}
            message={this.state.message} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state : Object, ownProps : Object) => ({
  bucketlists: state.bucketlists,
  whoami: state.whoami,
  response: state.bucketlists.request
})

const mapDispatchToProps = dispatch => ({
  getBucketlists: token => dispatch(getBucketlists(token)),
  addBucket: bucket => dispatch(addBucketlist(bucket)),
  updateBucket: bucket => dispatch(updateBucketlist(bucket)),
  deleteBucket: payload => dispatch(deleteBucketlist(payload)),
  resetRequestState: () => dispatch(resetRequestState())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
