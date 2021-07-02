import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import {RouteIf} from "../hoc/RouteIf";
import loadable from '@loadable/component';


// const AuthBasicLayout = loadable(() => import('./AuthBasicLayout'));
// const Landing = loadable(() => import('../components/landing/Landing'));



const Layout = () => {
    useEffect(() => {
        // AuthBasicLayout.preload();
        // WizardLayout.preload();
    }, []);

    return (
        <Router fallback={<span/>}>
            <Switch>
                <RouteIf exact path="/" option={null} component={Landing}/>
                <Route component={DashboardLayout}/>
            </Switch>

        </Router>
    );
};

export default Layout;
