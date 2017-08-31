import {
  ADD_BUCKETLIST_SUCCESS,
  ADD_BUCKETLIST_FAILURE,
  ADD_BUCKETLIST_REQUEST,
  GET_BUCKETLISTS_REQUEST,
  GET_BUCKETLISTS_SUCCESS,
  GET_BUCKETLISTS_FAILURE,
  UPDATE_BUCKETLIST_REQUEST,
  UPDATE_BUCKETLIST_SUCCESS,
  UPDATE_BUCKETLIST_FAILURE,
  DELETE_BUCKETLIST_SUCCESS,
  DELETE_BUCKETLIST_FAILURE,
  DELETE_BUCKETLIST_REQUEST
} from "../actions/constants";

const initialState = {
  "status": ""
}


export default function bucketlists(state: Object = initialState, action) {
  switch (action.type) {
    case ADD_BUCKETLIST_SUCCESS:
      return Object.assign([], state, action.payload)
      break;

    case GET_BUCKETLISTS_REQUEST:
      return state;

    case DELETE_BUCKETLIST_REQUEST:
      return state;

    case ADD_BUCKETLIST_REQUEST:
      return state;
      break;

    case GET_BUCKETLISTS_SUCCESS:
      return Object.assign([], state, action.payload.data)
      break;

    case GET_BUCKETLISTS_FAILURE:
      return Object.assign({}, state, {
        message: action.payload.message
      })

    case DELETE_BUCKETLIST_SUCCESS:
      return Object.assign({}, state, {
        status: action.payload.status
      })
      break;

    case DELETE_BUCKETLIST_FAILURE:
      return Object.assign({}, state, {
        message: action.payload.message
      })
      break;

    default:
      return state;
  }
}
