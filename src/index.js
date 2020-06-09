import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './pages/Root/Root';
import * as serviceWorker from './serviceWorker';
import {store} from "./redux/store/store";
import {Provider} from "react-redux"

ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
