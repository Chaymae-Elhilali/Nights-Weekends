import React from 'react';
import Navbar from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
      {/* Other components can go here */}
    </div>
  );
}

export default App;

