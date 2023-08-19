import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home">

            {/* Hero Section */}
            <div className="hero">
                <h1>Connecting Fresh Produce with Urban Plates</h1>
                <p>Join our platform and experience the freshest produce directly from the farm.</p>
                <button className="navbar-button">Get Started</button>
            </div>

            {/* Features Section */}
            <div className="features">
                <div className="feature">
                    <h3>Direct from Farms</h3>
                    <p>Fresh produce sourced directly from local farms.</p>
                </div>
                <div className="feature">
                    <h3>Eco Friendly</h3>
                    <p>Minimize carbon footprint with reduced transportation and storage.</p>
                </div>
                <div className="feature">
                    <h3>Support Local</h3>
                    <p>Support local farmers and contribute to the community.</p>
                </div>
            </div>

            {/* Placeholder for Testimonials Section */}
            {/* You can expand on this part as per requirements */}
            <div className="testimonials">
                {/* Testimonials content */}
            </div>

            {/* Placeholder for Call to Action Section */}
            {/* This can be another button, some engaging text, etc. */}
            <div className="cta">
                {/* CTA content */}
            </div>

        </div>
    );
}

export default Home;
