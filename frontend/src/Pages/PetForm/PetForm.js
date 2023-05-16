import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import './PetForm.css';

function PetForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        color: '',
        description: '',
        breed: '',
        image: '',
        category: '',
        location: '',
        owner_contact_no: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const submitForm = async (petData) => {
        try {
            const formData = new FormData();
            Object.entries(petData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            const response = await fetch('http://localhost:4000/api/pet/create', {
                method: 'POST',
                body: formData,
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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.category === "none") {
            // Display an error message or perform any desired action
            return;
        }

        console.log(formData);
        submitForm(formData);
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
                />

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="owner_contact_no">Owner Contact Number:</label>
                <input
                    type="text"
                    id="owner_contact_no"
                    name="owner_contact_no"
                    value={formData.owner_contact_no}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image:</label>
                <FileBase64
                    type="file"
                    id="image"
                    name="image"
                    multiple={false}
                    onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
                />

                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    <option value="none">Select Category</option>
                    <option value="6462c865c6824c90a49e9843">Cat</option>
                    <option value="6462c7dcc6824c90a49e983e">Dog</option>
                    <option value="6462df4a03139ccfcef2982c">Bird</option>
                </select>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PetForm;
