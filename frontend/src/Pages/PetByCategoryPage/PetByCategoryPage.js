import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import './PetByCategoryPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

function PetByCategoryPage() {
    const { categoryId } = useParams();
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
        const fetchPetsByCategory = async () => {
            try {
                const response = await fetch(`${apiUrl}/pet/category/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pets by category');
                }
                const data = await response.json();
                setPets(data.pets);
                console.log(data)
                console.log(pets)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPetsByCategory();
    }, [categoryId]);

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
                <div className="pet-list">
                    {pets.map((pet) => (
                        <Link to={`/pet/${pet._id}`} className="custom-link">
                            <div key={pet._id} className="pet-category-card">

                                <img className="pet-category-image" src={pet.image} alt={`Pet ${pet.name}`} />
                                <div
                                    className="pet-category-info">
                                    <div className="pet-category-info-name">{pet.name}</div>
                                    <div className="pet-category-info-details">{pet.age}</div>
                                    <div className="pet-category-info-details">{pet.breed}</div>
                                    <div className="pet-category-info-details">{pet.location}</div>
                                </div>
                            </div>
                        </Link>
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
    )
}

export default PetByCategoryPage;
