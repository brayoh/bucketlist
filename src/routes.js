import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import App from './components/App';
import LoginContainer from './containers/login/LoginContainer';
import SignUpContainer from './containers/signup/SignUpContainer';
import DashboardContainer from './containers/dashboard/DashboardContainer';
import ItemsContainer from './containers/items/ItemsContainer';

import { whoami, loginUserSuccess } from "./actions/authorization";

import configureStore from "./store";
import instance from "./common/axios_config";

const store_config = configureStore()
export const store = store_config['store']

const requireAuth = (store) => (nextState, replace) => {
  if (!store.getState().auth.authenticated) {
    replace({
      pathname: '/login',
      state: {
        nextPathName: nextState.location.pathname
      }
    })
  }
}

const redirectIfAuth = (store) => (nextState, replace) => {
  if (store.getState().auth.authenticated) {
    replace({pathname: '/dashboard'})
  }
};

const AppRoutes = () => (

  <Provider store={store}>
    <Router history={store_config.history}>
      <Route path='/' component={App}>
        <IndexRoute component={DashboardContainer} />
        // public routes
        <Route path='/login' component={LoginContainer} onEnter={redirectIfAuth(store)}/>
        <Route path='/register' component={SignUpContainer} onEnter={redirectIfAuth(store)}/>

        // protected routes
        <Route path='/dashboard' component={DashboardContainer} onEnter={requireAuth(store)}/>
        <Route path='/dashboard/:bucket_id/items' component={ItemsContainer} onEnter={requireAuth(store)}/>

      </Route>
    </Router>
  </Provider>

);

export default AppRoutes;
