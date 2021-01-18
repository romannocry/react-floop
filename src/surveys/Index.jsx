import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { Receive } from './Receive';
import { TestQuestion } from './TestQuestion';

function Surveys({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/receive/:hash`} component={Receive} />
            <Route path={`${path}/add`} component={TestQuestion} />
            <Route path={`${path}/edit/:id`} component={TestQuestion} />
        </Switch>
    );
}

export { Surveys };