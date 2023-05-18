import React, { useState } from 'react';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const categoryImages = {
    Cat: '/images/homepage/cat-container.jpg',
    Dog: '/images/homepage/dog-container.jpg',
    Bird: '/images/homepage/bird-container.jpg',
};

const petCategoryId = {
    Cat: '6462c865c6824c90a49e9843',
    Dog: '6462c7dcc6824c90a49e983e',
    Bird: '6462df4a03139ccfcef2982c',
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

            <div className="category-container">
                {Object.keys(categoryImages).map((category) => (
                    <Link to={`/category/${petCategoryId[category]}`} key={category} className="category">
                        <div className="category-image-wrapper">
                            <img src={categoryImages[category]} alt={category} className="category-image" />
                        </div>
                        <span className="category-name">{category}</span>
                    </Link>
                ))}
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
