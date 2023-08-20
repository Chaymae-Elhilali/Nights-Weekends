import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    // check if user is logged in
    const [loggedIn, setLoggedIn] = useState(false);
    // if logged in, show dashboard button
    // else, show login and register buttons
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <Link to="/">Farm2Consumer</Link>
            </div>
            <div className="navbar-buttons">
                {loggedIn ? (
                    <>
                    <Link className="navbar-button" to="/dashboard/farmer">Dashboard</Link>
                    <Link className="navbar-button" to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                <Link className="navbar-button" to="/login">Login</Link>
                <Link className="navbar-button" to="/register">Register</Link>
                </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
