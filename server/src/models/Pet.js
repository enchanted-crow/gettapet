const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        breed: {
            type: String,
        },
        image: {
            type: String,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        location: {
            type: String,
        },
        owner_contact_no: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
)

module.exports = Pet = mongoose.model('Pet', PetSchema);