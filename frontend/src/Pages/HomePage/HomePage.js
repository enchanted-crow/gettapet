import React, { useState } from 'react';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const categoryImages = {
    Cats: '/images/homepage/cat-container.jpg',
    Dogs: '/images/homepage/dog-container.jpg',
    Birds: '/images/homepage/bird-container.jpg',
};

const petCategoryId = {
    Cats: '6462c865c6824c90a49e9843',
    Dogs: '6462c7dcc6824c90a49e983e',
    Birds: '6462df4a03139ccfcef2982c',
};

function HomePage() {
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


    return (
        <div className="homepage-container">
            {/* Top Bar */}
            <div className="search-bar-container">
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
                    {Object.keys(categoryImages).map((category) => (
                        <Link to={`/category/${petCategoryId[category]}`} key={category} className="custom-link">
                            <div
                                className="pet-category-card">
                                <img className="pet-category-image" src={categoryImages[category]} alt={category} />
                                <div
                                    className="home-pet-category-info">
                                    <div className="home-pet-category-name">{category}</div>
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
    );
}

export default HomePage;
