import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { Receive } from './Receive';

function Surveys({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route path={`${path}/receive/:hash`} component={Receive} />
        </Switch>
    );
}

export { Surveys };