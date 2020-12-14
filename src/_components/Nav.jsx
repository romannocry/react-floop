import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/react-floop/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/react-floop/users" className="nav-item nav-link">Users</NavLink>
                <NavLink to="/react-floop/surveys" className="nav-item nav-link">Surveys</NavLink>
            </div>
        </nav>
    );
}

export { Nav };