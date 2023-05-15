import React from 'react';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

const categoryImages = {
    Cat: '/images/homepage/cat-container.jpg',
    Dog: '/images/homepage/dog-container.jpg',
    Bird: '/images/homepage/bird-container.jpg',
};

function HomePage() {
    return (
        <div className="homepage-container">
            {/* Top Bar */}
            <div class="search-bar-container">
                <div class="search-wrapper">
                    <input type="text" class="search-bar" placeholder="Search" />
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div className="category-container">
                {Object.keys(categoryImages).map((category) => (
                    <Link to={`/${category.toLowerCase()}`} key={category} className="category">
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
                <Link to="/" className="bottom-panel-icon">
                    <FaUser />
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
