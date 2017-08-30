import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import * as reducers from "../reducers";
import rootSaga from "../sagas";
import initialState from "../reducers/defaultState";
import { whoami, loginUserSuccess } from "../actions/authorization";

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (){
  console.log(reducers)
  const store = createStore(combineReducers({
      ...reducers,
      "routing": routerReducer
    }), applyMiddleware(sagaMiddleware, logger))

    const history = syncHistoryWithStore(browserHistory, store)

    sagaMiddleware.run(rootSaga)

    let token = localStorage.getItem('awesome_bucketlist_token')

    if (token === null) {
        token = sessionStorage.getItem('token')
    }
    if (token !== null) {
        store.dispatch(loginUserSuccess());
        store.dispatch(whoami(token));
    }
    return {store, history};
}
