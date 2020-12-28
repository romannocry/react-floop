import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { TestFunc } from './TestFunc';

function TestingZone({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/add`} component={TestFunc} />
            <Route path={`${path}/edit/:id`} component={TestFunc} />
        </Switch>
    );
}

export { TestingZone };