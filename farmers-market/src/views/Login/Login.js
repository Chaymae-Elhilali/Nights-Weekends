import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // To show error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { email, password });
            
            if (response.data.success) {
                // Store token and update app state
                localStorage.setItem('token', response.data.token);
                // Redirect or update state to indicate user is logged in
                // For now, just clear any error messages:
                setError("");
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
