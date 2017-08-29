import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import AppRoutes from "./routes";
import "./styles/app.css";

ReactDOM.render(<AppRoutes />, document.getElementById('root'));

registerServiceWorker();
