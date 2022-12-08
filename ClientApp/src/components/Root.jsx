import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Layout from './Layout';
import { locale, loadMessages } from "devextreme/localization";
import { esMessages } from '../data/dx.messages.es';
import PrivateRoute from './header/PrivateRouter';
import HomePage from './home/HomePage';
import Login from '../pages/account/Login';
import Logout from '../pages/account/Logout';
import ChangePassword from '../pages/account/ChangePassword';
import ResetPassword from '../pages/account/ResetPassword';

export default class Root extends Component {

    constructor(props) {
        super(props);
        loadMessages({
            'es': esMessages
        });
        locale(navigator.language);
    }

    componentDidMount() {
        setTimeout(() => {
            const preloader = document.querySelector('.site-preloader');

            preloader.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity') {
                    preloader.parentNode.removeChild(preloader);
                }
            });
            preloader.classList.add('site-preloader__fade');
        }, 500);
    }

    render(){
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <PrivateRoute
                        path="/driver"
                        render={(props) => (
                            <Layout {...props} headerLayout='driver'  />
                        )}
                    />                    
                    <Route path="/account/login" component={Login} />
                    <Route path="/account/logout" component={Logout} />                   
                    <Route path="/account/password" component={ChangePassword} />                   
                    <Route path="/account/resetpassword" component={ResetPassword} />                   
                    <Route path="/driver" component={HomePage} />
                    <Redirect to='/driver'/>
                </Switch>
            </BrowserRouter>
        )
    }    
}

