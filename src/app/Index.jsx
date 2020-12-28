import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert } from '@/_components';
import { Home } from '@/home';
import { Users } from '@/users';
import { Surveys } from '@/surveys';
import { TestingZone } from '@/TestingZone';

function App() {
    const { pathname } = useLocation();  
    console.log(pathname)
    console.log(process.env)
    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path='/users' component={Users} />
                    <Route path="/surveys" component={Surveys} />
                    <Route path="/tests" component={TestingZone} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 