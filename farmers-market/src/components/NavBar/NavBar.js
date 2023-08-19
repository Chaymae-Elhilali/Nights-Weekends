import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <Link to="/">Farm2Consumer</Link>
            </div>
            <div className="navbar-buttons">
                <Link className="navbar-button" to="/login">Login</Link>
                <Link className="navbar-button" to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Navbar;
