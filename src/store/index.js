import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import * as reducers from "../reducers";
import rootSaga from "../sagas";
import initialState from "../reducers/defaultState";

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (){

  const store = createStore(combineReducers({ ...reducers,
                                              "routing": routerReducer
                                            }),
                                            applyMiddleware(sagaMiddleware, logger))
     console.log(store.getState())
    const history = syncHistoryWithStore(browserHistory, store)

    sagaMiddleware.run(rootSaga)

    return {store: store, history: history};
}
