import React, { useState } from 'react';
import './PetForm.css';

function PetForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        color: '',
        description: '',
        breed: '',
        image: '',
        imageLabel: '',
        additionalImages: [],
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        submitForm(formData);
    };

    const submitForm = async (petData) => {
        try {
            const response = await fetch('http://localhost:4000/pet/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(petData),
            });

            if (!response.ok) {
                throw new Error('Error creating pet');
            }

            const data = await response.json();
            // Handle the response data as needed
            console.log(data);
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    };


    return (
        <div className="form-container">
            <h2>Pet Form</h2>
            <form className="pet-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age:</label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <label htmlFor="breed">Breed:</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />

                <label htmlFor="imageLabel">Image Label:</label>
                <input
                    type="text"
                    id="imageLabel"
                    name="imageLabel"
                    value={formData.imageLabel}
                    onChange={handleChange}
                />

                <label htmlFor="additionalImages">Additional Images:</label>
                <input
                    type="text"
                    id="additionalImages"
                    name="additionalImages"
                    value={formData.additionalImages}
                    onChange={handleChange}
                />

                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Bird">Bird</option>
                </select>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PetForm;
