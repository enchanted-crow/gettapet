const Pet = require("../models/Pet");
const fs = require('fs');
const path = require('path');


exports.getAll = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findById(id);
        res.json(pet);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

exports.create = async (req, res) => {
    try {
        console.log(req.files);
        const { name, age, color, breed, description, category } = req.body;
        const { image } = req.files;

        let imagePath = '';

        if (image && image.length > 0) {
            imagePath = image[0].path;
        }

        const createdPet = await Pet.create({
            name,
            age,
            breed,
            color,
            description,

            category,
            image: imagePath,
        });

        res.json({ message: 'Pet created', createdPet })
    }

    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, color, breed, description, category } = req.body;
        const { image } = req.files;

        let imagePath = '';

        if (image && image.length > 0) {
            imagePath = image[0].path;
        }

        const existingPet = await Pet.findById(id);

        if (imagePath.length === 0) {
            imagePath = existingPet.image;
        } else {
            fs.unlink(path.join(__dirname, '../', image), (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    return;
                }
            })
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, {
            name,
            age,
            breed,
            color,
            description,

            category,
            image: imagePath,
        }, { new: true });

        res.json({ message: 'Pet updated', updatedPet })
    }

    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Pet.findByIdAndRemove(id);

        res.json({ message: 'done', deleted });


    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}