import React from 'react';
import { useState } from 'react';
import MyProducts from '../../../components/Product/MyProducts';
import './Farmer.css';

const FarmerDashboard = () => {
    const [view, setView] = useState('dashboard'); // possible values: 'dashboard', 'myProducts'

    const handleMyProductsClick = () => {
    setView('myProducts');
}


    return (
        <div className="dashboard-container">
            <div className="dashboard-nav">
                {/* Dashboard navigation contents */}
                <ul>
                    <li>Home</li>
                    <button onClick={handleMyProductsClick}>My Products</button>
                    <li>Orders</li>
                    <li>Profile</li>
                </ul>
            </div>
            <main className="dashboard-content">
                {view === 'myProducts' && (
            <>
                <MyProducts />
            </>
        )}

            </main>
        </div>
    );
}

export default FarmerDashboard;
