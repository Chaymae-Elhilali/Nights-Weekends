import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import FarmerDashboard from './views/Dashboard/Farmer/Farmer';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div>
    <Router>
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/dashboard/farmer' element={<FarmerDashboard />} />
                {/* Add more routes as necessary */}
            </Routes>

            <Footer />
        </Router>
    </div>
  );
}

export default App;

