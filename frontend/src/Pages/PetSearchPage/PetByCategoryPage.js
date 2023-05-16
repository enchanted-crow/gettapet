import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaUser, FaHome } from 'react-icons/fa';
import './PetByCategoryPage.css';

const petCategoryId = {
    '6462c865c6824c90a49e9843': 'Cats',
    '6462c7dcc6824c90a49e983e': 'Dogs',
    '6462df4a03139ccfcef2982c': 'Birds',
}

function PetByCategoryPage() {
    const { categoryId } = useParams();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPetsByCategory = async () => {
            try {
                const response = await fetch(`https://gettapet-server.onrender.com/api/pet/category/${categoryId}`);
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
            <div class="search-bar-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div class="search-wrapper">
                    <input type="text" class="search-bar" placeholder="Search" />
                    <i class="fas fa-search"></i>
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
                <Link to="/" className="bottom-panel-icon">
                    <FaUser />
                </Link>
            </div>
        </div>
    )
}

export default PetByCategoryPage;
