import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PetPage from './PetPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/:category" element={<PetPage />} />
                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
}

export default App;
