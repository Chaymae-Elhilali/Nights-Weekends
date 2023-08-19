// src/components/Footer.js

import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>We connect fresh produce directly from farms to your plate, ensuring quality and freshness.</p>
            </div>
            
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/terms">Terms & Conditions</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
            
            <div className="footer-section">
                <h3>Follow Us</h3>
                <div className="social-icons">
                    {/* Adjust these hrefs to your social media profiles */}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            
        </footer>
    );
}

export default Footer;
