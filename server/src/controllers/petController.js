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

        res.status(200).json({
            status: 'fetched',
            data: pet,
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.getByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const pets = await Pet.find({ category: categoryId }).populate('category');
        res.json({ pets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch pets by category' });
    }
};

exports.searchPet = async (req, res) => {
    const searchTerm = req.query.searchTerm; // Get the search term from the request query

    try {
        // Perform the search using regular expressions and case-insensitive matching
        const pets = await Pet.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { age: { $regex: searchTerm, $options: 'i' } },
                { color: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { breed: { $regex: searchTerm, $options: 'i' } },
                { location: { $regex: searchTerm, $options: 'i' } },
            ],
        });

        res.json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while searching for pets.' });
    }
};

exports.create = async (req, res) => {
    try {
        console.log(req.files);

        const createdPet = new Pet(req.body);
        await createdPet.save();
        res.status(201).json({ message: 'Pet created', createdPet });
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