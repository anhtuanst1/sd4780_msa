import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactModal from 'react-modal';
import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PageNotFound from './components/Common/PageNotFound';
import './custom.scss';

ReactModal.setAppElement('#root');

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<App />} />
            <Route path="page-not-found" element={<PageNotFound />} />
            {/* <Route path="*" element={<Navigate to="/page-not-found" />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
