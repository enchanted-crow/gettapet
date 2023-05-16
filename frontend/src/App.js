import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import PetPage from './Pages/PetPage/PetPage';
import PetForm from './Pages/PetForm/PetForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/:category" element={<PetPage />} />
                <Route exact path="/:new-post" element={<PetForm />} />
                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
}

export default App;
