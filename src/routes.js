import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import LoginContainer from './containers/login';
import SignUpContainer from './containers/signup';
import configureStore from "./store";

const store_config = configureStore()

const AppRoutes = () => (
  <Provider store={store_config.store}>
      <Router history={store_config.history}>
          <Route path='/' component={App}>
              <Route path='/login' component={LoginContainer} />
              <Route path='/register' component={SignUpContainer} />
              <Route path='/bucketlists/:bucket_id' component={App}>
                  <Route path='/bucketlists/:bucket_id/new' component={App} />
                  <Route path='/bucketlists/:bucket_id/edit' component={App} />
                  <Route path='/bucketlists/:bucket_id/delete' component={App} />
                  <Route path='/bucketlists/:bucket_id/items/:item_id/edit' component={App} />
                  <Route path='/bucketlists/:bucket_id/items/:item_id/delete' component={App} />
              </Route>
          </Route>
      </Router>
  </Provider>
);

export default AppRoutes;
