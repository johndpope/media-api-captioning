import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App/index.js";  
import * as serviceWorker from './serviceWorker';

// APP
ReactDOM.render(
    <App />,  
document.getElementById('app'));

serviceWorker.unregister();