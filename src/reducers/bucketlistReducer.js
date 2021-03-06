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
  DELETE_BUCKETLIST_REQUEST,
  RESET_REQUEST_STATE
} from "../actions/constants";

const initialState = {
  request: {
    "status": "",
    "message": ""
  }
}

export default function bucketlists(state : Object = initialState, action) {
  switch (action.type) {
    
    case GET_BUCKETLISTS_REQUEST:
    case UPDATE_BUCKETLIST_REQUEST:
    case DELETE_BUCKETLIST_REQUEST:
    case ADD_BUCKETLIST_REQUEST:
      return state;

    case RESET_REQUEST_STATE:
      return Object.assign([], state, {
        request: {
          status: "",
          message: ""
        }
      });

    case ADD_BUCKETLIST_SUCCESS:
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    case ADD_BUCKETLIST_FAILURE:
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    case GET_BUCKETLISTS_SUCCESS:
      return Object.assign([], state, action.payload.data)

    case GET_BUCKETLISTS_FAILURE:
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    case UPDATE_BUCKETLIST_SUCCESS:
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    case UPDATE_BUCKETLIST_FAILURE:
      return Object.assign([], state, {
        request: {
          message: action.payload.message,
          status: action.payload.status
        }
      });

    case DELETE_BUCKETLIST_SUCCESS:
      state = state.filter((bucket) => bucket.id !== action.payload.bucket_id)
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    case DELETE_BUCKETLIST_FAILURE:
      return Object.assign([], state, {
        request: {
          status: action.payload.status,
          message: action.payload.message
        }
      });

    default:
      return state;
  }
}
