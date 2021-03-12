const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        trim: true
    }
});

const Category = mongoose.model('Categories', categorySchema);
module.exports = Category;