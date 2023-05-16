import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PetByCategoryPage.css';

function PetByCategoryPage() {
    const { categoryId } = useParams();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPetsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/pet/category/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pets by category');
                }
                const data = await response.json();
                setPets(data.pets);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPetsByCategory();
    }, [categoryId]);

    return (
        <div className="pet-by-category-container">
            <h2>Pets in Category</h2>
            <div className="pet-list">
                {pets.map((pet) => (
                    <div key={pet._id} className="pet-card">
                        <Link to={`/pet/${pet._id}`}>
                            <img className="pet-image" src={pet.image} alt={`Pet ${pet.name}`} />
                            <h3 className="pet-name">{pet.name}</h3>
                            <p className="pet-description">{pet.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PetByCategoryPage;
