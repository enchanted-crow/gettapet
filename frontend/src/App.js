import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import PetPage from './Pages/PetPage/PetPage';

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
