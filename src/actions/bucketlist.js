import {
  GET_BUCKETLISTS_REQUEST,
  ADD_BUCKETLIST_REQUEST,
  UPDATE_BUCKETLIST_REQUEST,
  DELETE_BUCKETLIST_REQUEST,
  RESET_REQUEST_STATE
} from "./constants";

export const getBucketlists: Object = () => ({type: GET_BUCKETLISTS_REQUEST})

export const addBucketlist: Object = (payload) => ({type: ADD_BUCKETLIST_REQUEST, payload})

export const updateBucketlist: Object = (payload) => ({type: UPDATE_BUCKETLIST_REQUEST, payload})

export const deleteBucketlist: Object = (payload) => ({type: DELETE_BUCKETLIST_REQUEST, payload})

export const resetRequestState: Object = () => ({type: RESET_REQUEST_STATE})
