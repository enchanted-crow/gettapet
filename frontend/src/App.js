import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import PetPage from './Pages/PetPage/PetPage';
import PetForm from './Pages/PetForm/PetForm';
import PetByCategoryPage from './Pages/PetByCategoryPage/PetByCategoryPage';
import PetSearchPage from './Pages/PetSearchPage/PetSearchPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/:pet/:petId" element={<PetPage />} />
                <Route exact path="/category/:categoryId" element={<PetByCategoryPage />} />
                <Route exact path="/:new-post" element={<PetForm />} />
                <Route exact path="/search/:searchTerm" element={<PetSearchPage />} />
                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
}

export default App;
