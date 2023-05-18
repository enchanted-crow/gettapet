import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import './PetSearchPage.css';
// require('dotenv').config()

const apiUrl = process.env.REACT_APP_API_URL;

function PetSearchPage() {
    const { searchTerm: searchTermParam } = useParams();
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch();
    };

    const performSearch = () => {
        if (searchTerm.trim()) {
            // Redirect to PetSearchPage with the search term as a parameter
            window.location.href = `/search/${searchTerm}`;
            // history.push(`/search/${searchTerm}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            e.preventDefault();
            performSearch();
        }
    };

    useEffect(() => {
        const searchPets = async () => {
            try {
                const response = await fetch(`${apiUrl}/pet/search/${searchTermParam}`);
                if (!response.ok) {
                    throw new Error('Error searching for pets');
                }
                const data = await response.json();
                setPets(data.pets);
                return pets;
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (searchTermParam) {
            searchPets();
        }
    }, [searchTermParam]);


    return (
        <div className="homepage-container">
            {/* Top Bar */}
            <div className="search-bar-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="search-wrapper">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <i className="fas fa-search" onClick={handleSearchSubmit}></i>
                </div>
            </div>
            <div className="pet-by-category-container">
                <h2></h2>
                <div className="pet-list">
                    {pets.map((pet) => (
                        <div key={pet._id} className="pet-card">
                            <Link to={`/pet/${pet._id}`}>
                                <img className="pet-image" src={pet.image} alt={`Pet ${pet.name}`} />
                                <h3 className="pet-name">{pet.name}</h3>
                                <p className="pet-description">{pet.breed}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom-panel">
                <Link to="/" className="bottom-panel-icon">
                    <FaHome />
                </Link>
                <Link to="/new-post" className="bottom-panel-icon">
                    <FaPlus />
                </Link>
                {/* <Link to="/" className="bottom-panel-icon">
                    <FaUser />
                </Link> */}
            </div>
        </div>
    );
}

export default PetSearchPage;
