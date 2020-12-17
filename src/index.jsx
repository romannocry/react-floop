import React from 'react';
import { BrowserRouter , useLocation} from 'react-router-dom';
import { render } from 'react-dom';
import { App } from './app';

import './styles.less';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
const { pathname } = useLocation();  

render(
    <BrowserRouter basename={pathname}>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);