import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/register', { name ,email, password, role });

            if (response.data.success) {
                setError("");
                // Redirect or handle success
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="name" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <div className="role-selection">
                    <div 
                        className={`role-card ${role === "farmer" ? "selected" : ""}`}
                        onClick={() => setRole("farmer")}
                    >
                        Join as Farmer
                    </div>
                    <div 
                        className={`role-card ${role === "customer" ? "selected" : ""}`}
                        onClick={() => setRole("customer")}
                    >
                        Join as Customer
                    </div>
                </div>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>

            <div className="login-redirect">
                Already have an account? <a href="/login">Login here</a>
            </div>
        </div>
    );
}

export default Register;
