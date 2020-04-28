import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

let store=createStore(
    reducers,
    applyMiddleware(logger,thunk)
)

ReactDOM.render(
    // 全局声明路由
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
