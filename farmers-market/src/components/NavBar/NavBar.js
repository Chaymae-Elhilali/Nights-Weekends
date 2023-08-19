import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                Farm2Consumer
            </div>
            <div className="navbar-buttons">
                <button className="navbar-button">Login</button>
                <button className="navbar-button">Register</button>
            </div>
        </div>
    );
}

export default Navbar;
