import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Layout from "./layouts/Layout";

function App() {
    return (
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <Layout/>
            </Router>
        </Provider>
    );
}

export default App;
