import {
  GET_BUCKETLISTS_REQUEST,
  GET_BUCKETLISTS_SUCCESS,
  GET_BUCKETLISTS_FAILURE
} from "../actions/constants";


export default function bucketlists(state = {}, action) {
  switch (action.type) {
    case GET_BUCKETLISTS_REQUEST:
      return state;
      break;

    case GET_BUCKETLISTS_SUCCESS:
      return action.payload.data
      break;
    case GET_BUCKETLISTS_FAILURE:

      return Object.assign({}, state, {
        message: action.payload.message
      })

      break;
    default:
      return state;
  }
}
