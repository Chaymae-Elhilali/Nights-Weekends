import React, { useState } from 'react';
// router-dom is used for routing
import { Link , Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // To show error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            
            if (response.status === 200 || response.status === 201) {
                // Store token and update app state
                localStorage.setItem('token', response.data.token);
                // Redirect this user to dashboard if login is successful and check for role from token
                if (response.data.token) {
                    const role = jwt_decode(response.data.token).user.role;
                    console.log(role);
                    if (role === 'farmer' || role === 'admin') {
                        navigate('/dashboard/farmer');
                    } else if (role === 'consumer') {
                        navigate('/dashboard/consumer');
                    } else if (role === 'admin') {
                        navigate('/dashboard/admin');
                    }
                }
            } else {
                // If login is unsuccessful due to wrong credentials
                setError("Invalid email or password.");
            }
        } catch (error) {
            // Handle other errors, like network issues or server errors
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error if there's any */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </div>
    );
}

export default Login;
